import { IoLocationSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { TypeAnimation } from "react-type-animation";
const DeliveryCard = () => {
    return (
        <div>
            <h1 className="font-bold text-center mt-40 lg:text-5xl text-3xl">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Top!',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
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
            <div
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 mt-10 max-w-5xl mx-auto">
                <div className="card border-2 rounded-none">
                    <figure><img src="https://i.ibb.co/wBZDBQM/Delivary-Man.jpg" alt="Apartment"/></figure>
                    <div className="space-y-2">
                        <div className="p-4 space-y-2">
                            <h2 className="card-title">Family Apartment</h2>
                            <p className="flex items-center text-[#9D9D9D]">
                                <IoLocationSharp className="text-[#9D9D9D]"></IoLocationSharp>
                                Dhanmondi, Dhaka</p>
                        </div>
                        <hr/>
                        <div className="flex p-4 font-extrabold justify-between items-center">
                            <h1 className="flex justify-center items-center gap-2"><TbTruckDelivery className="text-xl"></TbTruckDelivery> 200$</h1>
                            <div className="rating rating-sm flex justify-center items-center gap-2">
                                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                                <h1>200$</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border-2 rounded-none">
                    <figure><img className="bg-gray-400" src="https://i.ibb.co/nwTVYfd/Delivary-Man4.png" alt="Apartment"/></figure>
                    
                    <div className="space-y-2">
                        <div className="p-4 space-y-2">
                            <h2 className="card-title">Family Apartment</h2>
                            <p className="flex items-center text-[#9D9D9D]">
                                <IoLocationSharp className="text-[#9D9D9D]"></IoLocationSharp>
                                Dhanmondi, Dhaka</p>
                        </div>
                        <hr/>
                        <div className="flex p-4 font-extrabold justify-between items-center">
                            <h1 className="flex justify-center items-center gap-2"><TbTruckDelivery className="text-xl"></TbTruckDelivery> 200$</h1>
                            <div className="rating rating-sm flex justify-center items-center gap-2">
                                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                                <h1>200$</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border-2 rounded-none">
                    <figure><img src="https://i.ibb.co/ck3kqdD/Delivary-Man2.jpg" alt="Apartment"/></figure>
                    <div className="space-y-2">
                        <div className="p-4 space-y-2">
                            <h2 className="card-title">Family Apartment</h2>
                            <p className="flex items-center text-[#9D9D9D]">
                                <IoLocationSharp className="text-[#9D9D9D]"></IoLocationSharp>
                                Dhanmondi, Dhaka</p>
                        </div>
                        <hr/>
                        <div className="flex p-4 font-extrabold justify-between items-center">
                            <h1 className="flex justify-center items-center gap-2"><TbTruckDelivery className="text-xl"></TbTruckDelivery> 200$</h1>
                            <div className="rating rating-sm flex justify-center items-center gap-2">
                                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                                <h1>200$</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryCard;