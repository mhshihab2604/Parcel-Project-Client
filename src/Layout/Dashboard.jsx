import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 w-full min-h-screen bg-gradient-to-r from-[#21b75f] to-[#31386e]">
                <ul className="menu p-4 text-white">
                    <li><Link to="/"><a href="#" className="block py-2 px-4">Home</a></Link></li>
                    <li><Link to="/"><a href="#" className="block py-2 px-4">Home</a></Link></li>
                    <li><Link to="/"><a href="#" className="block py-2 px-4">Home</a></Link></li>
                </ul>
            </div>
            
            <div className="flex-1 p-8 mx-2">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
