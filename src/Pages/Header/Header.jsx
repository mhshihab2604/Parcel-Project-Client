import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useAuth from "../useAuth/useAuth";
import {Tooltip} from 'react-tooltip'
import { FaShoppingCart } from "react-icons/fa";
const Header = () => {
    const [theme, setTheme] = useState('light')

    const {logout, user} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false)
    console.log(user);
    const handleSignOut = () => {
        setShowDropdown(false)
        logout()
            .then()
            .catch();
    };

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')

        // add custom data-theme attribute
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('sunset')
        } else {
            setTheme('light')
        }
    }
    return (
        <div className="navbar bg-white shadow-lg px-4 py-0 fixed z-30">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"><path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16"/></svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-10">
                        <Link
                            className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                            to="/">Home</Link>
                        <Link
                            className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                            to="/register">Register</Link>
                        <Link
                            className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                            to="/updateProfile">Update Profile</Link>
                        <li><Link to="/dashboard">
                            <button className="flex items-center gap-1">
                                <FaShoppingCart className="text-[#249D62]"></FaShoppingCart>
                                <div className="badge bg-gradient-to-r from-[#21b75f] to-[#31386e] text-white">Dashboard</div>
                            </button>
                        </Link></li>
                    </ul>
                </div>
                <Link to="/">
                    <div className="flex justify-center -space-x-2  items-center">
                        <img className="w-20 h-20" src="https://i.ibb.co/ySCx18M/Blue-Delivery-Logo-removebg-preview.png" alt="" />
                        <div className="bg-gradient-to-r from-[#03cdb5] to-[#C8143A] text-transparent bg-clip-text lg:flex hidden">
                            <a className=" text-sm lg:text-xl font-extrabold">Parcelio</a>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10">
                    <Link
                        className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                        to="/">Home</Link>
                    <Link
                        className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                        to="/register">Register</Link>
                    <Link
                        className="flex items-center px-4 -mb-1 hover:border-b-2 dark:border- hover:dark:text-[#22B160] dark:border-[#22B160]"
                        to="/updateProfile">Update Profile</Link>
                    <li><Link to="/dashboard">
                        <button className="flex items-center gap-1">
                            <FaShoppingCart className="text-[#249D62]"></FaShoppingCart>
                            <div className="badge bg-gradient-to-r from-[#21b75f] to-[#31386e] text-white">Dashboard</div>
                        </button>
                    </Link></li>
                </ul>
            </div>
            {
                user
                    ? (
                        <div className="navbar-end relative space-x-2">
                            <div
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={user.displayName}
                                data-tooltip-place="left">
                                <Tooltip id="my-tooltip"/>
                                <img
                                    className="w-10 h-10 rounded-full border-4 border-green-600"
                                    src={user.photoURL}
                                    alt=""
                                    onClick={() => setShowDropdown(!showDropdown)}/>
                            </div>
                            <div
                                className={showDropdown
                                    ? "userDropDown showDropdown space-y-2"
                                    : "userDropDown"}>
                                <h1 className="text-xl font-medium">Name:{user.displayName}</h1>
                                <h1 className="font-medium">{user.email}</h1>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-1 rounded  bg-gradient-to-r from-[#21b75f] to-[#31386e] text-white border-none">Logout</button>
                        </div>
                    )
                    : (
                        <div className="navbar-end">
                            <Link to="/login">
                                <button
                                    onClick={logout}
                                    className="btn bg-gradient-to-r from-[#21b75f] to-[#31386e] text-white border-none">
                                    Login
                                </button>
                            </Link>
                        </div>
                    )
            }
            <label className="cursor-pointer grid place-items-center ml-2">
                <input
                    onChange={handleToggle}
                    type="checkbox"
                    
                    className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                <svg
                    className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <svg
                    className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
        </div>
        
    );
};

export default Header;