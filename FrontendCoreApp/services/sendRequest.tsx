import axios, { Method } from "axios";
import RequestError from "./request/RequestErrors";
import API_URL from "./config";

const sendRequest = async (
    endpoint: string,
    method: Method = "GET",
    data: object = {} 
  ) => {
    try {
      const response = await axios({
        method,
        url: `${API_URL}/${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: method !== "GET" ? JSON.stringify(data) : undefined, 
        withCredentials: false,
      });
  
      if (!response.data) {
        throw new RequestError("No response data", 404, "No data returned");
      }
  
      return response.data;
    } catch (error: any) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Unknown error occurred";
      throw new RequestError(error.message, status, message);
    }
  };
  

export default sendRequest;
