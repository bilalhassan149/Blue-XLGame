import axios from "axios";

//用户登录
export function login(name, pwd) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:3000", {
        //localhost:3000
        name: name,
        pwd: pwd,
      })
      .then((res) => {
        if (!res.data) {
          return;
        }
        const { code } = res.data;
        code === 0 || code === "0" ? resolve() : reject();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

export function getUserInfo(url, usdId) {
  return new Promise(() => {
    axios
      .get(url, {
        userId: usdId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
