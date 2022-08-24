import { TOKEN_COOKIE } from "../utils/constants";
import axios from "axios";
import VueCookies from "vue-cookies";
import {eventBus} from "../main";

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
        eventBus.$emit('api-error', error?.response?.data?.message ?? 'server error');
    }
  );
  
  export default interceptor;
  