import { IoLocationSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { TypeAnimation } from "react-type-animation";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DeliveryCard = () => {
    const axiosSecure = useAxiosSecure();
    const { data: delivery = [] } = useQuery({
        queryKey: ['delivery'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/u/delivery');
            return res.data;
        }
    });

    return (
        <div>
            <h1 className="font-medium text-center mt-40 lg:text-5xl text-3xl">
                <TypeAnimation
                    sequence={[
                        'Top!',
                        1000,
                        'Top Delivery',
                        1000,
                        'Top Delivery Man',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                />
            </h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 mt-10 max-w-5xl mx-auto">
                {delivery.map((item) => (
                    <div key={item.id} className="card border-2 rounded-none">
                        <figure><img src={item.image} alt="Delivery Man" /></figure>
                        <div className="space-y-2">
                            <div className="p-4 space-y-2">
                                <h2 className="card-title">{item.name}</h2>
                                <p className="flex items-center text-[#9D9D9D]">
                                    <IoLocationSharp className="text-[#9D9D9D]" />
                                    Dhanmondi, Dhaka
                                </p>
                            </div>
                            <hr />
                            <div className="flex p-4 font-extrabold justify-between items-center">
                                <h1 className="flex justify-center items-center gap-2">
                                    <TbTruckDelivery className="text-xl" /> 200$
                                </h1>
                                <div className="rating rating-sm flex justify-center items-center gap-2">
                                    <input type="radio" name={`rating-${item.id}`} className="mask mask-star-2 bg-orange-400" />
                                    <h1>200$</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryCard;
