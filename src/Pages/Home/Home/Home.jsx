import { Helmet } from "react-helmet";
import SimpleMap from "../SimpleMap/SimpleMap";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import DeliveryCard from "../DeliveryCard/DeliveryCard";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <FeaturedSection></FeaturedSection>
            <DeliveryCard></DeliveryCard>
            <div className="flex items-center justify-center mt-20">
                <div className="stats shadow bg-cover bg-center bg-no-repeat relative"
                    style={{ backgroundImage: 'url("https://i.ibb.co/sKsjqMW/Banner-Image.jpg")'}}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative stat">
                        <div className="stat-figure text-[#FCA22A]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <div className="stat-title text-white">Total Likes</div>
                        <a className="stat-value text-sm lg:text-4xl font-extrabold text-white">25.6K</a>
                        <div className="stat-desc font-semibold text-lg text-[#FCA22A]">21% more than last month</div>
                    </div>

                    <div className="relative stat">
                        <div className="stat-figure text-[#22B060]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div className="stat-title text-white">Page Views</div>
                        <a className="stat-value text-sm lg:text-4xl font-extrabold text-white">2.6M</a>
                        <div className="stat-desc font-semibold text-lg text-[#FCA22A]">21% more than last month</div>
                    </div>

                    <div className="relative stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full border-4 border-[#FCA22A]">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <a className="stat-value text-sm lg:text-4xl font-extrabold text-white">86%</a>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc font-semibold text-lg text-[#FCA22A]">31 tasks remaining</div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
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