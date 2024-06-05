import { TypeAnimation } from "react-type-animation";
import animation from "./animation.json"
import Lottie from "lottie-react";

const Banner = () => {
    return (
        <div>
            <div className="hero h-[700px] bg-[#3A3C3F] text-white rounded-xl mt-10">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 items-center pt-10">
                    <Lottie className="lg:w-[600px] w-80 mx-auto" animationData={animation} loop={true} />
                    <div className="text-center lg:text-start">
                        <h1 className="font-medium lg:text-5xl text-3xl">
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Box!',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Box Office',
                                    1000,
                                    'Box Office News',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ display: 'inline-block' }}
                                repeat={Infinity}
                                />
                        </h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. <br /> Quaerat fugiat ut
                            assumenda excepturi exercitationem quasi. <br /> In deleniti eaque aut repudiandae et a
                            id nisi.</p>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;