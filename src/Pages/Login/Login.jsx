import {useEffect} from 'react';
import {useForm} from "react-hook-form";
import useAuth from "../useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {Helmet} from 'react-helmet';
import Swal from "sweetalert2";
import {loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha} from 'react-simple-captcha';
import Lottie from 'lottie-react';
import loginAnimation from "./login.json"

const Login = () => {
    const {signInUser} = useAuth();

    const {register, handleSubmit, formState: {
            errors
        }} = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location
        ?.state || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const onSubmit = (data) => {
        const {email, password, captcha} = data;

        if (!validateCaptcha(captcha)) {
            toast.error('Captcha does not match');
            return;
        }

        signInUser(email, password)
            .then((result) => {
                if (result.user) {
                    navigate(from);
                    Swal.fire(
                        {title: 'Login Success!', text: 'User Login Successfully', icon: 'success', confirmButtonText: 'Cool'}
                    )
                }
            })
            .catch(() => {
                toast.error('Email or Password invalid')
            });
    };

    return (
        <div className="mx-2 mt-20">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='flex lg:flex-row flex-col justify-center items-center gap-10'>
                <div>
                    <Lottie className="lg:w-[600px] w-80 mx-auto" animationData={loginAnimation} loop={true} />
                </div>
                <div
                    className="w-full max-w-md p-8 border-2 space-y-3 rounded-xl dark:text-black">
                    <h1 className="text-3xl font-bold dark:text-gray-600 text-center">Login Now</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate=""
                        action=""
                        className="space-y-6 pt-5">
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                name="email"
                                id="username"
                                placeholder="Email"
                                className="w-full outline-none border-b-2 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("email", { required: true })}/> {errors.email && (<span className="text-red-500">This field is required</span>)}
                        </div>
                        <div className="space-y-1 text-sm">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full outline-none border-b-2 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("password", { required: true })}/> {
                                errors.password && (
                                    <span className="text-red-500">This field is required</span>
                                )
                            }
                            <div className="flex justify-end text-xs dark:text-gray-600">
                                <a rel="noopener noreferrer" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <LoadCanvasTemplate/>
                            <input
                                type="text"
                                name="captcha"
                                id="captcha"
                                placeholder="Enter Captcha Value"
                                className="w-full outline-none border-b-2 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("captcha", { required: true })}/> {errors.captcha && (<span className="text-red-500">This field is required</span>)}
                        </div>
                        <button
                            className="block w-full p-3 text-center rounded-sm dark:text-white bg-[#3A3C3F] font-semibold border-2">
                            Login
                        </button>
                    </form>
                    <SocialLogin/>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don not have an account?
                        <Link to="/register">
                            <a rel="noopener noreferrer" href="#" className="underline  dark:text-gray-800">Register</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
