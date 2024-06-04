import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem';

const DeliveryMenu = () => {
    return (
        
        <div>
            <div className="flex justify-center items-center">
                <img
                    className="w-20 h-20"
                    src="https://i.ibb.co/ySCx18M/Blue-Delivery-Logo-removebg-preview.png"
                    alt=""/>
                <div className="bg-[#3A3C3F] text-transparent bg-clip-text lg:flex hidden">
                    <a className=" text-sm lg:text-xl font-extrabold">Parcelio</a>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 bg-white shadow-2xl rounded-xl p-2">
                <MenuItem label='My Delivery List' address='myDeliveryList' />
                <MenuItem label='My Reviews' address='myReviews' />
            </div>
            <hr/>
            <Link to="/">
                <div className="bg-white shadow-2xl rounded-xl p-2">
                    Home
                </div>
            </Link>
        </div>
    );
};

export default DeliveryMenu;