import { Outlet } from "react-router-dom";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";


const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;