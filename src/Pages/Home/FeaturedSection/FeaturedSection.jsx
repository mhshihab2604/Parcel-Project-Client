import { FaShippingFast } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";
const FeaturedSection = () => {
    return (
        <div>
            <h1 className="font-medium text-center lg:mt-20 mt-44 lg:text-5xl text-3xl">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Our !',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Our Features',
                        1000,
                        'Our Features Section',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                    />
            </h1>
             <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 container mx-auto items-center justify-center lg:mt-10 mt-5">
                <div className="shadow-xl border-x-2 rounded">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10 text-sky-400">
                            <GiReceiveMoney className="text-6xl " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="lg:text-3xl text-2xl font-bold">Flat Rate Fees</h1>
                            <p className="text-base text-gray-700 font-medium">Select high-quality boxes and packaging materials to withstand transit.</p>
                        </div>
                    </div>
                </div><div className="shadow-xl border-x-2 rounded">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10">
                            <IoIosTimer className="text-6xl text-sky-400 " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="lg:text-3xl text-2xl  font-bold">24/7 Services</h1>
                            <p className="text-base text-gray-700 font-medium">Provide customer support <br /> 24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-xl border-x-2 rounded">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10">
                            <FaShippingFast className="text-5xl text-sky-400" />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="lg:text-3xl text-2xl font-bold">Super First Delivery</h1>
                            <p className="text-base text-gray-700 font-medium">Orders are processed immediately upon receipt to ensure quick dispatch.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSection;