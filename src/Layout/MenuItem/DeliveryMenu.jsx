import MenuItem from '../MenuItem';

const DeliveryMenu = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <MenuItem label='My Delivery List' address='/' />
            <MenuItem label='My Reviews' address='/' />
            <MenuItem label='My Profile' address='/dashboard/profile' />
        </div>
    );
};

export default DeliveryMenu;