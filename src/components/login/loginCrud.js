import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/`,
});

export function getUserToken(req) {
  return api
    .post("/auth", req)
    .then((res) => {
      localStorage.setItem(
        "loginStatus",
        JSON.stringify({
          token: res.data.token,
          signedIn: true,
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getUser() {
  return new Promise((resolve, reject) => {
    var status = JSON.parse(localStorage.getItem("loginStatus"));
    api
      .get("/auth/user", {
        headers: {
          "x-auth-token": status.token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
