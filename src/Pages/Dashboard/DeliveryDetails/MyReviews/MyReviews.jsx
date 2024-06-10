import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../useAuth/useAuth';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/deliveryManId/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensures the query runs only if the email is available
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={review.image} alt="" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <p className="text-lg font-semibold"><strong>User Name:</strong> {review.name}</p>
                                <p className="text-gray-700"><strong>Rating:</strong> {review.rating}</p>
                                <p className="text-gray-700"><strong>User Feedback:</strong> {review.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No reviews found.</p>
            )}
        </div>
    );
};

export default MyReviews;

