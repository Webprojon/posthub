import axios from "axios";
import { createApiError, handleApiError } from "./http-error";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError = handleApiError(error);
    const transformedError = createApiError(apiError);
    return Promise.reject(transformedError);
  },
);
