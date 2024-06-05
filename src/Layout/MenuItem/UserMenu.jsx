import {Link} from "react-router-dom";
import MenuItem from "../MenuItem";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
const UserMenu = () => {
    return (
        <div>
            <div className="flex items-center">
                <img
                    className="w-20 h-20"
                    src="https://i.ibb.co/ySCx18M/Blue-Delivery-Logo-removebg-preview.png"
                    alt=""/>
                <div className="bg-[#3A3C3F] text-transparent bg-clip-text">
                    <a className=" text-sm lg:text-xl font-extrabold">Parcelio</a>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 bg-white shadow-2xl rounded-xl p-2">
                <div className="flex items-center gap-2">
                    <IoBookmarks className="text-xl"></IoBookmarks><MenuItem label='Book a Parcel' address='bookParcel'/>
                </div>
                <div className="flex items-center gap-2">
                    <MdOutlineProductionQuantityLimits className="text-2xl"></MdOutlineProductionQuantityLimits><MenuItem label='My Parcels' address='myParcel'/>
                </div>
                <div className="flex items-center gap-2">
                    <CgProfile className="text-2xl"></CgProfile><MenuItem label='My Profile' address='/dashboard/profile'/>
                </div>
            </div>
            <hr/>
            <Link to="/">
                <div className="bg-white shadow-2xl rounded-xl p-2 flex items-center gap-2">
                    <FaHome className="text-2xl"></FaHome>Home
                </div>
            </Link>
        </div>
    );
};

export default UserMenu;