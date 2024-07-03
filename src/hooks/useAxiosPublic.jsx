import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://full-stack-project-server-side.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;