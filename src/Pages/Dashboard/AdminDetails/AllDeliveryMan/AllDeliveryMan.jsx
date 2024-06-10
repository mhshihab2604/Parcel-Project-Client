import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all delivery men
    const { data: delivery = [] } = useQuery({
        queryKey: ['delivery'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/u/delivery');
            return res.data;
        }
    });

    // Fetch all parcels
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            return res.data;
        }
    });

    // Fetch all reviews
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    // Calculate the number of delivered parcels and average review score for each delivery man
    const deliveryData = delivery.map(deliver => {
        const deliveredCount = parcels.filter(parcel => parcel.status === 'Delivered' && parcel.deliveryManId === deliver._id).length;
        const deliveryManReviews = reviews.filter(review => review.deliveryMenId === deliver._id);
        const averageReview = deliveryManReviews.length ? 
            deliveryManReviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / deliveryManReviews.length 
            : 0;
        return { ...deliver, deliveredCount, averageReview: averageReview.toFixed(2) }; // Keeping two decimal places
    });

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
                            <thead className="bg-[#FCF0E3] text-black">
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
                                    deliveryData.map((deliver, index) => 
                                        <tr key={deliver._id}>
                                            <th>{index + 1}</th>
                                            <td>{deliver.name}</td>
                                            <td>{deliver.phoneNumber}</td>
                                            <td>{deliver.deliveredCount}</td>
                                            <td>{deliver.averageReview}</td>
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
