import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";

import SimpleMap from "../SimpleMap/SimpleMap";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import DeliveryCard from "../DeliveryCard/DeliveryCard";

import { FaShippingFast } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
             
            <div className="grid w-96 ml-5 md:w-auto lg:w-auto  grid-cols-1 my-[130px] md:grid-cols-2 lg:grid-cols-3 gap-5 md:container lg:container md:mx-auto lg:mx-auto items-center justify-center">
                <div className="shadow-2xl rounded-2xl">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10 text-[#D1A054]">
                            <GiReceiveMoney className="text-6xl " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl font-bold">Transparent Pricing</h1>
                            <p className="text-base text-gray-700 font-medium">Know the exact costs upfront with clear pricing policies.</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-2xl rounded-2xl">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10">
                            <IoIosTimer className="text-6xl text-[#D1A054] " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl  font-bold">Round-the-Clock Tracking</h1>
                            <p className="text-base text-gray-700 font-medium">Track parcels 24/7 to stay updated on their status and location.</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-2xl rounded-2xl">
                    <div className="flex w-auto h-52 items-center">
                        <div className=" px-10">
                            <FaShippingFast className="text-5xl text-[#D1A054]" />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl font-bold">Express Delivery</h1>
                            <p className="text-base text-gray-700 font-medium">Get parcels delivered swiftly with our express delivery service.</p>
                        </div>
                    </div>
                </div>
            </div>

            <FeaturedSection></FeaturedSection>
            <DeliveryCard></DeliveryCard>

            <div className="mt-40">
                <div className="text-center">
                    <h1 className="lg:text-3xl text-xl">We Are Available For You 24/7</h1>
                    <small>OUR ONLINE SUsmallPORT SERVICE IS ALWAYS 24 HOURS</small>
                </div>
                <SimpleMap />
            </div>

        </div>
    );
};

export default Home;