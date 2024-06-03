import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import useAuth from "../../../useAuth/useAuth";
import MyParcelCard from "./MyParcelCard";

const MyParcel = () => {
    const [parcels, setParcels] = useState();
    const {user} = useAuth()
    useEffect(() => {
        fetch(`http://localhost:5000/parcel/${user.email}`)
            .then(res => res.json())
            .then(data => setParcels(data));
    }, [user])

    return (
        <div>
            <Helmet>
                <title>My Post</title>
            </Helmet>
            <section className='mt-16 mx-6'>
                <h2 className="lg:text-4xl text-2xl text-center font-medium">My Post</h2>
                <div className="mt-10">
                    {
                        parcels
                            ?.map(parcel => <MyParcelCard key={parcel._id} parcel={parcel}></MyParcelCard>)
                    }
                </div>
            </section>
        </div>
    );
};

export default MyParcel;