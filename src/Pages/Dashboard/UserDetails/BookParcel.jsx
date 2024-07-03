import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../useAuth/useAuth';
import {Helmet} from 'react-helmet';

const DeliveryForm = () => {
    const {user} = useAuth()
    const {register, watch, setValue, reset} = useForm();

    // Pre-fill user data
    useEffect(() => {
        setValue('name', user.displayName);
        setValue('email', user.email);
    }, [setValue, user]);

    const handleSubmit = (e) => {
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        const bookingDate = new Date();
        const formattedBookingDate = `${months[bookingDate.getMonth()]} ${String(bookingDate.getDate()).padStart(2, '0')}`;

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const parcelType = form.parcelType.value;
        const parcelWeight = form.parcelWeight.value;
        const receiverName = form.receiverName.value;
        const receiverPhoneNumber = form.receiverPhoneNumber.value;
        const deliveryAddress = form.deliveryAddress.value;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;
        const price = form.price.value;
        const deliveryDate = form.deliveryDate.value;
        const newParcel = {
            name,
            email,
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverPhoneNumber,
            deliveryAddress,
            deliveryDate,
            latitude,
            longitude,
            price,
            bookingDate: formattedBookingDate,
            status: "pending",
            approximateDate: "",
            deliveryManId: ""

        }

        console.log(newParcel);
        // send data to the server
        fetch('https://full-stack-project-server-side.vercel.app/parcel', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newParcel)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    reset();
                    Swal.fire(
                        {title: 'Success!', text: 'Your parcel has been booked', icon: 'success', confirmButtonText: 'Cool'}
                    )
                }
            })
    };

    // Watch parcel weight to calculate price
    const parcelWeight = watch('parcelWeight');
    let price = 0;
    if (parcelWeight) {
        if (parcelWeight <= 1) 
            price = 50;
        else if (parcelWeight <= 2) 
            price = 100;
        else 
            price = 150;
        }
    
    return (
        <div>
            <Helmet>
                <title>Book Parcel</title>
            </Helmet>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white">
                <div className="flex justify-center items-center gap-5 ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            name='name'
                            type="text"
                            {...register('name')}
                            readOnly="readOnly"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            name='email'
                            type="email"
                            {...register('email')}
                            readOnly="readOnly"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            name='phoneNumber'
                            type="tel"
                            {...register('phoneNumber', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Parcel Type</label>
                        <input
                            name='parcelType'
                            type="text"
                            {...register('parcelType', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Parcel Weight (kg)</label>
                        <input
                            name='parcelWeight'
                            type="number"
                            step="0.01"
                            {...register('parcelWeight', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Receivers Name</label>
                        <input
                            name='receiverName'
                            type="text"
                            {...register('receiverName', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Receivers Phone Number</label>
                        <input
                            name='receiverPhoneNumber'
                            type="tel"
                            {...register('receiverPhoneNumber', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Parcel Delivery Address</label>
                        <input
                            name='deliveryAddress'
                            type="text"
                            {...register('deliveryAddress', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Requested Delivery Date</label>
                    <input
                        name='deliveryDate'
                        type="date"
                        {...register('deliveryDate', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Address Latitude</label>
                        <input
                            name='latitude'
                            type="number"
                            step="0.000001"
                            {...register('latitude', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Address Longitude</label>
                        <input
                            name='longitude'
                            type="number"
                            step="0.000001"
                            {...register('longitude', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price (Tk)</label>
                    <input
                        name='price'
                        type="number"
                        value={price}
                        readOnly="readOnly"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-[#D1A054] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryForm;
