import axios from "axios";
import { URLS } from "../../utils/constants/apis";
import { getToken } from "../api/client";

const instance = axios.create({
  baseURL: `${URLS.NOTIFICATION_URL}/api/notifications/`,
  headers: {
    "Content-Type": "application/json",
  },
});
const requestHandler = async (request: any) => {
  const token = await getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: any) => {
  if (response?.status === 401) {
    // signOutUser();//todo:  sign user out
  }

  return response;
};

instance.interceptors.request.use((request) => requestHandler(request));

instance.interceptors.response.use((response) => responseHandler(response));

export default instance;
