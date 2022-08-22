import { TOKEN_COOKIE } from "../utils/constants";
import axios from "axios";
import VueCookies from "vue-cookies";
const interceptor = axios.create({});
interceptor.interceptors.request.use((config) => {
    const token = VueCookies.get(TOKEN_COOKIE)
    if (!token) {
      return config;
    }
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  });
  
  interceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        // error.config.headers[
        //   "Authorization"
        // ] = `bearer ${response.data.access_token}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  export default interceptor;
  