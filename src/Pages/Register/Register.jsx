import { useForm } from "react-hook-form";
import useAuth from "../useAuth/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import registerAnimation from "./register.json";
import Lottie from "lottie-react";

const Register = () => {
    const { createUser, UpdateUserProfile, refetchUser, setRefetchUser, saveUser } = useAuth();
    const [registerError, setRegisterError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const onSubmit = async (data) => {
        const { email, password, image, name, usersType, phoneNumber } = data;

        setRegisterError("");
        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters or longer");
            return;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            setRegisterError(
                "Your password should have at least one uppercase and one lowercase character"
            );
            return;
        }

        try {
            // Create user
            await createUser(email, password);
            // Update user profile
            await UpdateUserProfile(name, image, usersType);

            await saveUser({name, email, image, phoneNumber, role: "user"})
            // Refetch user data
            setRefetchUser(!refetchUser);
            // Navigate to the previous page or home
            navigate(from);
            // Show success message
            Swal.fire({
                title: 'Register Success!',
                text: 'User Register Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
        } catch (error) {
            console.error("Error during registration:", error);
            setRegisterError("This email is already registered");
        }
    };

    return (
        <div className="mx-2 mt-20">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="flex lg:flex-row flex-col justify-center items-center gap-10">
                <div>
                    <Lottie className="lg:w-[600px] w-80 mx-auto" animationData={registerAnimation} loop={true} />
                </div>
                <div className="w-full max-w-md p-8 space-y-5 border-2 rounded-xl dark:text-black">
                    <h1 className="text-3xl dark:text-gray-600 font-bold text-center">Register Now</h1>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate="" className="space-y-6 pt-5">
                        <div className="flex justify-center items-center gap-5">
                            <div className="space-y-1 text-sm">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                    {...register("image", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("phoneNumber", { required: true })}
                            />
                            {errors.phoneNumber && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <div className="space-y-1 text-sm">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <select
                                name="usersType"
                                className="select select-bordered w-full max-w-xs"
                                {...register("usersType", { required: true })}
                            >
                                <option disabled selected>Who shot first?</option>
                                <option>User</option>
                                <option>Delivery Man</option>
                            </select>
                            {errors.usersType && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="relative space-y-1 text-sm">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("password", { required: true })}
                            />
                            <span className="absolute top-3 right-1" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                            <div className="flex justify-end text-xs dark:text-gray-600">
                                <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-[#3A3C3F] font-semibold border-2">
                            Register
                        </button>
                    </form>
                    {registerError && <p className="text-red-500 font-medium">{registerError}</p>}

                    <SocialLogin />

                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">
                        Don you have an account?
                        <Link to="/login" className="underline dark:text-gray-800">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
