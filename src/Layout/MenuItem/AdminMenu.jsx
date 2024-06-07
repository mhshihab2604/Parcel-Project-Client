import { Link } from "react-router-dom";
import MenuItem from "../MenuItem";
import { GrDeliver } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiStatista } from "react-icons/si";

const AdminMenu = () => {
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
                    <GrDeliver className="text-2xl"></GrDeliver><MenuItem label='All Parcels' address='allParcel' />
                </div>
                <div className="flex items-center gap-2">
                    <FaUsers className="text-2xl"></FaUsers><MenuItem label='All Users' address='allUsers' />
                </div>
                <div className="flex items-center gap-2">
                    <GrUserWorker className="text-2xl"></GrUserWorker><MenuItem label='All Delivery Men' address='allDeliveryMan' />
                </div>
                <div className="flex items-center gap-2">
                    <SiStatista className="text-xl"></SiStatista><MenuItem label='Statistic' address='statistic' />
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

export default AdminMenu;

