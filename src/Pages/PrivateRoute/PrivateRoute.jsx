import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../useAuth/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loader} = useAuth();
    const location = useLocation();


    if(loader){
        return  <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
      
    }
    if(!user){
        return <Navigate to="/login" state={location?.pathname || "/"}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;