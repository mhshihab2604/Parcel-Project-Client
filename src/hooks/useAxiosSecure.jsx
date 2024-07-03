import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://full-stack-project-server-side.vercel.app/'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;