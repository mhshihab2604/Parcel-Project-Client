import { Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import UserMenu from "./MenuItem/UserMenu";
import DeliveryMenu from "./MenuItem/DeliveryMenu";
import AdminMenu from "./MenuItem/AdminMenu";

const Dashboard = () => {
    const [role] = useRole();
    return (
        <div className="flex md:flex-row flex-col lg:flex-row">
            <div className="lg:w-64 w-full min-h-screen bg-[#FCF0E3] shadow-2xl p-5">
                {role === "user" && <UserMenu></UserMenu>}
                {role === "deliveryMan" && <DeliveryMenu></DeliveryMenu>}
                {role === "admin" && <AdminMenu></AdminMenu>}
            </div>
            
            <div className="flex-1 p-8 mx-2">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
