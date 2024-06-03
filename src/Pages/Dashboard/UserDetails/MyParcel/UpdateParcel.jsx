import useAuth from "../../../useAuth/useAuth";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {useForm} from "react-hook-form";
import {useLoaderData} from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateParcel = () => {

    const {
        _id,
        phoneNumber,
        parcelType,
        parcelWeight,
        receiverName,
        receiverPhoneNumber,
        deliveryAddress,
        deliveryDate,
        latitude,
        longitude,
        price
    } = useLoaderData();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {register, handleSubmit, watch} = useForm();

    const onSubmit = async (data) => {
        data.parcelWeight = parseFloat(data.parcelWeight);
        data.receiverPhoneNumber = parseFloat(data.receiverPhoneNumber);
        data.latitude = parseFloat(data.latitude);
        data.longitude = parseFloat(data.longitude);
        data.price = parseFloat(data.price);

        const menuItem = {
            phoneNumber: data.phoneNumber,
            parcelType: data.parcelType,
            parcelWeight: data.parcelWeight,
            receiverName: data.receiverName,
            receiverPhoneNumber: data.receiverPhoneNumber,
            deliveryAddress: data.deliveryAddress,
            deliveryDate: data.deliveryDate,
            latitude: data.latitude,
            longitude: data.longitude
        };

        try {
            const parcelRes = await axiosSecure.patch(`/parcel/${_id}`, menuItem);
            if (parcelRes.data.modifiedCount > 0) {
                // reset()
                Swal.fire(
                    {title: 'Success!', text: 'Parcel Updated Successfully', icon: 'success', confirmButtonText: 'OK'}
                );
            } else {
                Swal.fire(
                    {title: 'Error!', text: 'Failed to Update Parcel', icon: 'error', confirmButtonText: 'OK'}
                );
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                {title: 'Error!', text: 'An error occurred while updating the parcel', icon: 'error', confirmButtonText: 'OK'}
            );
        }
    };

    const Weight = watch('parcelWeight');
    let weightPrice = 0;
    if (Weight) {
        if (Weight <= 1) 
            weightPrice = 50;
        else if (Weight <= 2) 
            weightPrice = 100;
        else 
            weightPrice = 150;
        }
    
    return (
        <div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                name='name'
                                defaultValue={user
                                    ?.displayName}
                                type="text"
                                {...register('name')}
                                readOnly="readOnly"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                name='email'
                                defaultValue={user
                                    ?.email}
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
                                defaultValue={phoneNumber}
                                type="tel"
                                {...register('phoneNumber', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Parcel Type</label>
                            <input
                                name='parcelType'
                                defaultValue={parcelType}
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
                                defaultValue={parcelWeight}
                                type="number"
                                step="0.01"
                                {...register('parcelWeight', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Receivers Name</label>
                            <input
                                name='receiverName'
                                defaultValue={receiverName}
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
                                defaultValue={receiverPhoneNumber}
                                type="tel"
                                {...register('receiverPhoneNumber', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Parcel Delivery Address</label>
                            <input
                                name='deliveryAddress'
                                defaultValue={deliveryAddress}
                                type="text"
                                {...register('deliveryAddress', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Requested Delivery Date</label>
                        <input
                            name='deliveryDate'
                            defaultValue={deliveryDate}
                            type="date"
                            {...register('deliveryDate', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Address Latitude</label>
                            <input
                                name='latitude'
                                defaultValue={latitude}
                                type="number"
                                step="0.000001"
                                {...register('latitude', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Address Longitude</label>
                            <input
                                name='longitude'
                                defaultValue={longitude}
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
                            defaultValue={price}
                            value={weightPrice}
                            type="number"
                            readOnly="readOnly"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update Parcel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateParcel;
