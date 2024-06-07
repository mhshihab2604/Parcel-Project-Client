import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Statistic = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            return res.data;
        }
    });

    const [chartData, setChartData] = useState({
        series: [{
            name: 'Bookings',
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                title: {
                    text: 'Bookings'
                }
            },
            fill: {
                opacity: 1,
                colors: ['#DEB37D'] // Set the desired color here
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            }
        }
    });

    useEffect(() => {
        if (parcels.length) {
            // Process data to get bookings by date
            const bookingsByDate = {};
            parcels.forEach(parcel => {
                const date = new Date(parcel.bookingDate).toLocaleDateString();
                if (bookingsByDate[date]) {
                    bookingsByDate[date]++;
                } else {
                    bookingsByDate[date] = 1;
                }
            });

            const dates = Object.keys(bookingsByDate);
            const bookings = Object.values(bookingsByDate);

            setChartData(prevData => ({
                ...prevData,
                series: [{ name: 'Bookings', data: bookings }],
                options: {
                    ...prevData.options,
                    xaxis: { categories: dates }
                }
            }));
        }
    }, [parcels]);

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="bg-[#FCF0E3] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Bookings by Date</h2>
                <div id="chart">
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistic;
