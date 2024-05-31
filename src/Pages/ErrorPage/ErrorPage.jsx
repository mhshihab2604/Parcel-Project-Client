import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Lottie from "lottie-react";
import error from "./error.json";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
const ErrorPage = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    return (
        <>
            <Helmet>
                <title>Error Page</title>
            </Helmet>
            <div className="bg-[#E9FDFF] min-h-screen flex flex-col justify-center items-center">
                <div className="mt-20">
                    <Lottie className="lg:w-[600px] w-80 mx-auto" animationData={error} loop={true} />
                    <div className="max-w-md text-center mx-auto mt-5">
                        <p  data-aos="fade-right" className="lg:text-2xl font-semibold text-xl">Sorry, we could not find this page.</p>
                        <p  data-aos="fade-right" className="mt-4 mb-8 dark:text-gray-600">But do not worry, you can find plenty of other things on our homepage.</p>
                        <Link className="px-8 py-3 font-semibold rounded dark:bg-[#38AA95] dark:text-gray-50" to="/">Back to homepage</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
