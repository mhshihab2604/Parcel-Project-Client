import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../useAuth/useAuth";
const MyParcelCard = ({ parcel, fetchParcels }) => {
    const { parcelType, deliveryDate, bookingDate, status } = parcel || {};
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://full-stack-project-server-side.vercel.app/parcel/${_id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                { title: "Deleted!", text: "Your parcel has been deleted.", icon: "success" }
                            );
                            fetchParcels();  // Refetch parcels after delete
                        }
                    });
            }
        });
    };
    console.log("parcel", parcels);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                <thead>
                    <tr className="bg-[#FCF0E3] text-black">
                        <th className="py-3 px-6 text-left border-b">Parcel Type</th>
                        <th className="py-3 px-6 text-left border-b">Booking Date</th>
                        <th className="py-3 px-6 text-left border-b">Delivery Date</th>
                        <th className="py-3 px-6 border-b text-left">Update</th>
                        <th className="py-3 px-6 border-b text-left">Delete</th>
                        <th className="py-3 px-6 border-b text-left">Give Review</th>
                        <th className="py-3 px-6 border-b text-left">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 transition duration-300">
                        <td className="py-4 px-6 border-b">{parcelType}</td>
                        <td className="py-4 px-6 border-b">{bookingDate}</td>
                        <td className="py-4 px-6 border-b">{deliveryDate}</td>
                        <td className="py-4 px-6 border-b">
                            <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                                <button
                                    className={`btn-xs rounded-full text-white ${status === 'On The Way' ? 'bg-gray-400' : 'bg-[#D1A054]'}`}
                                    disabled={status === 'On The Way'}
                                >
                                    Update
                                </button>
                            </Link>
                        </td>
                        <td className="py-4 px-6 border-b">
                            <button
                                onClick={() => handleDelete(parcel._id)}
                                className={`btn-xs rounded-full text-white ${status === 'On The Way' ? 'bg-gray-400' : 'bg-[#D1A054]'}`}
                                disabled={status === 'On The Way'}
                            >
                                Delete
                            </button>
                        </td>
                        <td className="py-4 px-6 border-b ">
                            <Link to={`/dashboard/reviews/${parcel._id}`}><button className="bg-[#D1A054] btn-xs rounded-full text-white">Review</button></Link>
                        </td>
                        <td className="py-4 px-6 border-b ">
                            {parcels.length ? (
                                <Link to={`/dashboard/payment/${parcel._id}`}>
                                    <button className="btn-xs rounded-full text-white bg-[#D1A054]">Payment</button>
                                </Link>
                            ) : (
                                <button disabled className="btn-xs rounded-full text-white bg-[#D1A054]">Payment</button>
                            )}
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyParcelCard;

