import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();
    const { data: delivery =  []} = useQuery({
        queryKey: ['delivery'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users/u/delivery');
            return res.data;
        }
    })
    return (
        <div>
            <div>
                <div className="flex justify-between">
                    <h1 className="lg:text-3xl text-xl">All Delivery Man</h1>
                    <h1 className="lg:text-3xl text-xl">Total Users: {delivery.length}</h1>
                </div>
            <div>
                <div className="overflow-x-auto mt-5">
                    <table className="table table-zebra">
                        <thead  className="bg-[#FCF0E3] text-black">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                delivery.map((deliver, index) => 
                                    <tr key={deliver._id}>
                                        <th>{index+1}</th>
                                        <td>{deliver.name}</td>
                                        <td>{deliver.phoneNumber}</td>
                                        <td>{deliver.role}</td> 
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AllDeliveryMan;