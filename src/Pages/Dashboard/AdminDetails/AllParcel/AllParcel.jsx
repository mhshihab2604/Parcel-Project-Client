import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "react-datepicker/dist/react-datepicker.css";

const AllParcel = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [startDate, setStartDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedParcelId, setSelectedParcelId] = useState(null);

    const { data: parcels = [], refetch: refetchParcels } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`);
            return res.data;
        },
    });

    const { data: delivery = [] } = useQuery({
        queryKey: ['delivery'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/u/delivery`);
            return data;
        },
    });

    const openModal = (parcelId) => {
        setSelectedParcelId(parcelId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedParcelId(null);
    };

    const selectedParcel = parcels.find(parcel => parcel._id === selectedParcelId);

    const handleAddDeliveryMan = async (event) => {
        event.preventDefault();
        const form = event.target;
        const deliveryManId = form.deliveryMan.value;
        const approximateDate = startDate.toISOString();
        const addDeliveryMan = { deliveryManId, approximateDate, status: 'On The Way' };

        if (!selectedParcelId) {
            Swal.fire({
                icon: 'error',
                title: 'No parcel selected',
                text: 'Please select a parcel to assign.',
            });
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/parcel/u/${selectedParcelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addDeliveryMan)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Delivery Man Assigned Successfully');
                queryClient.invalidateQueries('parcels');
                closeModal();
                refetchParcels();
            } else {
                throw new Error(data.message || 'Failed to update parcel');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to update parcel',
            });
        }
    };

    return (
        <div className="mx-2">
            <div className="flex justify-between">
                <h1 className="lg:text-3xl text-xl">All Parcel</h1>
                <h1 className="lg:text-3xl text-xl">Total Users: {parcels.length}</h1>
            </div>
            <div className="overflow-x-auto text-xl">
                <table className="table">
                    <thead>
                        <tr className="bg-[#FCF0E3] text-black">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel.phoneNumber}</td>
                                <td>{parcel.bookingDate}</td>
                                <td>{parcel.deliveryDate}</td>
                                <td>{parcel.price}</td>
                                <td>
                                    <button className="btn lg:btn-xs bg-[#D1A054] rounded-3xl text-white">{parcel.status}</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => openModal(parcel._id)}
                                        className={`btn-xs rounded-full font-medium text-white ${
                                            (parcel.status === 'On The Way' || parcel.status === 'Delivered')
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#D1A054]'
                                        }`}
                                        disabled={parcel.status === 'On The Way' || parcel.status === 'Delivered'}
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="w-full h-full fixed top-0 left-0 z-[999999] bg-[#3e3e3e9c] flex justify-center items-center">
                    <div className="lg:w-[500px] w-auto p-4 rounded-lg shadow-slate-950 shadow-2xl bg-[#FCF0E3]">
                        <button onClick={closeModal} className="btn btn-sm btn-circle bg-[#D1A054] border-0 text-white absolute right-2 top-2">
                            ✕
                        </button>
                        {selectedParcel && (
                            <div className="mb-4">
                                <h2 className="text-xl font-bold">Parcel Details</h2>
                                <p><strong>Name:</strong> {selectedParcel.name}</p>
                                <p><strong>Delivery Date:</strong> {selectedParcel.deliveryDate}</p>
                                <p><strong>Price:</strong> {selectedParcel.price}</p>
                            </div>
                        )}
                        <form onSubmit={handleAddDeliveryMan} className="max-w-sm mx-auto">
                            <label htmlFor="deliveryMan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Select an option
                            </label>
                            <select name="deliveryMan" id="deliveryMan" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Choose a Delivery Man</option>
                                {delivery.map((man) => (
                                    <option key={man._id} value={man._id}>
                                        {man.name}
                                    </option>
                                ))}
                            </select>
                            <div className="grid mt-5">
                                <label htmlFor="approxDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Select Approximate Date
                                </label>
                                <ReactDatePicker name="approxDate" className="rounded-xl border-0 px-2" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <button type="submit" className="btn bg-[#D1A054] border-0 btn-block mt-4 text-white">Assign</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllParcel;

