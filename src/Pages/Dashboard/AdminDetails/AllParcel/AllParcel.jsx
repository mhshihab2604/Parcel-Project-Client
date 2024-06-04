import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Modal } from "./Modal";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcel =  []} = useQuery({
        queryKey: ['parcel'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/parcel');
            return res.data;
        }
    })
    return (
            <div>
                <div className="flex justify-between">
                    <h1 className="lg:text-3xl text-xl">All Parcel</h1>
                    <h1 className="lg:text-3xl text-xl">Total Parcel: {parcel.length}</h1>
                </div>
            <div>
                <div className="overflow-x-auto mt-5">
                    <table className="table table-zebra">
                        <thead  className="bg-[#FCF0E3] text-black">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Booking Date</th>
                            <th>Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage Button</th>

                        </tr>
                        </thead>
                        <tbody>
                            {
                                parcel.map((parc, index) => 
                                    <tr key={parc._id}>
                                        <td>{index+1}</td>
                                        <td>{parc.name}</td>
                                        <td>{parc.phoneNumber}</td>
                                        <td>{parc.bookingDate}</td>
                                        <td>{parc.deliveryDate}</td>
                                        <td>{parc.price}tk</td>
                                        <td>{parc.status}</td>
                                        <td><Modal></Modal></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
    );
};

export default AllUsers;