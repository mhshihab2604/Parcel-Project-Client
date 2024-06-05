import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: parcel = [] } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            return res.data;
        }
    });

    const getParcelCountByUser = (email) => {
        return parcel.filter(parc => parc.email === email).length;
    };

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeDelivery = user => {
        axiosSecure.patch(`/users/deliveryMan/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a Delivery Man Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="lg:text-3xl text-xl">All Users</h1>
                <h1 className="lg:text-3xl text-xl">Total Users: {users.length}</h1>
            </div>
            <div>
                <div className="overflow-x-auto mt-5">
                    <table className="table table-zebra">
                        <thead className="bg-[#FCF0E3] text-black">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Number of parcel</th>
                                <th>Admin</th>
                                <th>Delivery Man</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1 + indexOfFirstUser}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <th>{user.phoneNumber}</th>
                                    <td>{getParcelCountByUser(user?.email)}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#D1A054] text-white btn-xs"><FaUser /></button>}
                                    </td>
                                    <td>
                                        {user.role === 'deliveryMan' ? 'Delivery Man' : <button onClick={() => handleMakeDelivery(user)} className="btn bg-[#D1A054] text-white btn-xs"><FaUser /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-5">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handleClick(index + 1)}
                            className={`btn mx-1 hover:bg-[#D1A054] hover:text-white ${currentPage === index + 1 ? 'btn-active hover:bg-[#D1A054] hover:text-white' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
