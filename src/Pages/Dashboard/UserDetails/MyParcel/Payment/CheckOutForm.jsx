import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../useAuth/useAuth";

const CheckOutForm = ({ parcelId }) => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user } = useAuth();
    
    console.log('Parcel ID:', id);  // Debugging line to check the id value

    const { data: parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            if (!id) return;
            const res = await axiosSecure.get(`/parcel/g/${id}`);
            return res.data;
        },
        enabled: !!id,  // Only run the query if id is available
    });
    console.log(parcel);

    useEffect(() => {
        if (!parcelId) return;

        const fetchParcel = async () => {
            const res = await axiosSecure.get(`/parcel/g/${parcelId}`);
            return res.data;
        };

        fetchParcel().then((parcel) => {
            if (parcel.price > 0) {
                axiosSecure.post('/create-payment-intent', { price: parcel?.price })
                    .then(res => {
                        setClientSecret(res.data.clientSecret);
                    });
            }
        });
    }, [axiosSecure, parcelId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('Payment Error', error);
            setError(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }
        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('Confirm Error', confirmError);
            setError(confirmError.message);
        } else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                await axiosSecure.delete(`/parcel/${id}`)
                    .then(() => {
                        toast.success('Parcel deleted successfully');
                    })
                    .catch(deleteError => {
                        console.log('Error deleting parcel', deleteError);
                        setError('Error deleting parcel after payment. Please contact support.');
                    });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-10">
            <CardElement className="rounded-xl text-3xl p-10 bg-[#FCF0E3]"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: 'black',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <Link to="/dashboard/paymentSuccess"><button type="submit" className="btn btn-block bg-[#C58C3F] my-3" disabled={!stripe || !clientSecret}>
                Pay
            </button></Link>
            <p className="text-red-700">{error}</p>
            {transactionId && <p className="text-green-500">Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;

