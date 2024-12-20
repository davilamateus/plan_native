import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://192.168.0.19:3000/";
//const BASE_URL = "https://plan-api.onrender.com/";

const Api = axios.create({
    baseURL: BASE_URL
});

Api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log(token, `TOKEN *****`);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }
        } catch (error) {
            console.error("Error fetching token", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { BASE_URL };
export default Api;
