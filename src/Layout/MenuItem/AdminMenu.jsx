import MenuItem from "../MenuItem";

const AdminMenu = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <MenuItem label='All Parcels' address='/' />
            <MenuItem label='All Users' address='/' />
            <MenuItem label='All Delivery Men' address='/' />
            <MenuItem label='My Profile' address='/dashboard/profile' />
        </div>
    );
};

export default AdminMenu;