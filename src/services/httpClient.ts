import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

httpClient.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL ?? ""}${config.url}`);
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    console.log(`[API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API] ${error.response?.status ?? "ERR"} ${error.config?.url}`, error.message);
    return Promise.reject(error);
  },
);

export default httpClient;
