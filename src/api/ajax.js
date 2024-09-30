import axios from "axios";
import router from "@/router";
import { codes } from "../assets/allFx";

axios.interceptors.response.use(
  function (response) {
    if (response.data.code == 9999) {
      codes("登录已失效，请先登录", 2);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return false;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
