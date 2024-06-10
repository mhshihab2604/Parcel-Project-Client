const SimpleMap = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10">
            <div className="lg:mr-6 w-auto ">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.070144525216!2d90.34947031692698!3d23.764578258569273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c09f9ba3d447%3A0x1babce9f1c6c95a3!2sMohammadpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1717091928727!5m2!1sen!2sbd"
                    className="w-full lg:w-[600px] h-64 sm:h-72 md:h-80 lg:h-[500px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="lg:ml-6 text-center shadow-2xl p-5">
                <h1 className="text-xl lg:text-2xl font-bold mb-2">Track Your Parcels with Parcelio</h1>
                <p className="text-sm lg:text-base">
                    Keep updated on the status and location of your parcels, ensuring timely delivery and peace of mind. <br /> Experience hassle-free parcel management with ShiHab, providing you with real-time tracking and notifications.
                </p>
            </div>
        </div>
    );
};

export default SimpleMap;
