import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const FeaturedSection = () => {
  const [stats, setStats] = useState({
    totalBooked: 0,
    totalDelivered: 0,
    totalUsers: 0,
  });
  const axiosSecure = useAxiosSecure();
  const { data: users = [],data: parcels = [] } = useQuery({
      queryKey: ['users','parcels'],
      queryFn: async () => {
          const res = await axiosSecure.get('/users','/parcel');
          return res.data;
      }
  });
  
  useEffect(() => {
    // Fetch the user statistics data from your backend or database
    axiosSecure.get('/users','parcel')
      .then(response => {
        setStats({
          totalBooked: parcels.length,
          totalDelivered: response.data.totalDelivered,
          totalUsers: response.data.totalUsers,
        });
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, [axiosSecure, parcels.length]);

  return (
    <div className="flex justify-center space-x-4 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 text-center">
        <h2 className="text-2xl font-bold mb-2">Total Parcels Booked</h2>
        <CountUp end={parcels.length} duration={2.5} className="text-4xl" />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 text-center">
        <h2 className="text-2xl font-bold mb-2">Total Parcels Delivered</h2>
        <CountUp end={stats.totalDelivered} duration={2.5} className="text-4xl" />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 text-center">
        <h2 className="text-2xl font-bold mb-2">Total Users</h2>
        <CountUp end={users.length} duration={2.5} className="text-4xl" />
      </div>
    </div>
  );
};

export default FeaturedSection;

