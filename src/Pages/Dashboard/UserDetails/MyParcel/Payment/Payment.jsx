import { useParams } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Payment for Parcel ID: {id}</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm parcelId={id} />
            </Elements>
        </div>
    );
};

export default Payment;


