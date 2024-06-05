import { Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import UserMenu from "./MenuItem/UserMenu";
import DeliveryMenu from "./MenuItem/DeliveryMenu";
import AdminMenu from "./MenuItem/AdminMenu";
import Lottie from "lottie-react";
import dashing from "./dashing.json"
const Dashboard = () => {
    const [role] = useRole();
    return (
        <div className="flex  flex-col lg:flex-row gap-5">
            <div className="relative lg:w-64 w-full min-h-screen bg-[#FCF0E3] shadow-2xl p-5">
                {role === "user" && <UserMenu></UserMenu>}
                {role === "deliveryMan" && <DeliveryMenu></DeliveryMenu>}
                {role === "admin" && <AdminMenu></AdminMenu>}

                <div className="absolute bottom-0 mt-5 flex  items-center justify-center">
                    <Lottie className="lg:w-[300px] w-[250px]" animationData={dashing} loop={true} />
                </div>
            </div>
            
            <div className="flex-1 p-2 lg:p-8 mx-2">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;