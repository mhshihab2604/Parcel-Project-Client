import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 w-full min-h-screen bg-[#FCF0E3] shadow-2xl p-5">
                <ul className="menu p-4 text-black bg-white shadow-xl rounded-xl">
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
