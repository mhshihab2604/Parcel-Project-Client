import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const MyParcelCard = ({parcel, parcels, setParcels}) => {
    const {_id, parcelType, deliveryDate} = parcel || {};

    const handleDelete = _id => {
        Swal
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/parcel/${_id}`, {method: 'DELETE'})
                        .then(
                            res => res.json()
                        )
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    {title: "Deleted!", text: "Your Post has been deleted.", icon: "success"}
                                );
                                const remaining = parcels.filter(parc => parc._id !== _id);
                                setParcels(remaining);
                            }
                        });
                }
            });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                <thead>
                    <tr className="bg-[#3A3C3F] text-white">
                        <th className="py-3 px-6 text-left border-b">Parcel Type</th>
                        <th className="py-3 px-6 text-left border-b">Delivery Date</th>
                        <th className="py-3 px-6 border-b text-left">Update</th>
                        <th className="py-3 px-6 border-b text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 transition duration-300">
                        <td className="py-4 px-6 border-b">{parcelType}</td>
                        <td className="py-4 px-6 border-b">{deliveryDate}</td>
                        <td className="py-4 px-6 border-b">
                            <Link to={`/dashboard/updateParcel/${_id}`}>
                                <button className="btn-xs bg-[#3A3C3F] rounded-full text-white">Update</button>
                            </Link>
                        </td>
                        <td className="py-4 px-6 border-b">
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn-xs bg-[#3A3C3F] rounded-full text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyParcelCard;
