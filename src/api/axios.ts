// src/api/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (!error.response) {
            return Promise.reject({
                message: "Server is unreachable",
            });
        }

        return Promise.reject(error.response.data);
    }
);

export default api;
