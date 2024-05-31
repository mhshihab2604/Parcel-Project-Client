import {useForm} from "react-hook-form";
import useAuth from "../useAuth/useAuth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {Helmet} from 'react-helmet';
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
const Register = () => {

    const {createUser, UpdateUserProfile, refetchUser, setRefetchUser} = useAuth();
    const [registerError, setRegisterError] = useState("")
    const {register, handleSubmit, formState: {
            errors
        }} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location
        ?.state || "/";

    const onSubmit = data => {
        const {email, password, image, name} = data

        setRegisterError("");
        if (password.length < 6) {
            setRegisterError("password should be at least 6 characters or longer")
            return;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            setRegisterError(
                "Your password should have at least one uppercase and one lowercase characters"
            )
            return;
        }
        // create user and update profile
        createUser(email, password)
            .then(() => {
                UpdateUserProfile(name, image).then(() => {
                    setRefetchUser(!refetchUser)
                    navigate(from);
                    Swal.fire(
                        {title: 'Register Success!', text: 'User Register Successfully', icon: 'success', confirmButtonText: 'Cool'}
                    )
                })
            })
            .catch(() => {
                setRegisterError("This email is already registered")
            })
        }

    return (
        <div className="mx-2">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div
                className="w-full max-w-md p-8 space-y-5 border-2 rounded-xl  dark:text-black mx-auto mt-20">
                <h1 className="text-3xl dark:text-gray-600 font-bold text-center">Register Now</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate=""
                    action=""
                    className="space-y-6 pt-5">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                name="name"
                                id="username"
                                placeholder="Name"
                                className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("name", { required: true })}/> {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                name="image"
                                id="username"
                                placeholder="Image URL"
                                className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                {...register("image", { required: true })}/>
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <input
                            type="text"
                            name="email"
                            id="username"
                            placeholder="Email"
                            className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                            {...register("email", { required: true })}/> {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative space-y-1 text-sm">
                        <input
                            type={showPassword
                                ? "text"
                                : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full border-b-2 outline-none px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                            {...register("password", { required: true })}/>
                        <span
                            className="absolute top-3 right-1"
                            onClick={() => setShowPassword(!showPassword)}>
                            {

                                showPassword
                                    ? <FaEyeSlash></FaEyeSlash>
                                    : <FaEye></FaEye>
                            }
                        </span>
                        {errors.password && <span className="text-red-500">This field is required</span>}
                        <div className="flex justify-end text-xs dark:text-gray-600">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button
                        className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-gradient-to-r from-[#21b75f] to-[#31386e] font-semibold border-2">Register</button>
                </form>
                {registerError && <p className="text-red-500 font-medium">{registerError}</p>}

                <SocialLogin></SocialLogin>

                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don you have an account?
                    <Link to="/login">
                        <a rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Login</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
