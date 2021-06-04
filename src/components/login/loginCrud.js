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
  var status = JSON.parse(localStorage.getItem("loginStatus"));
  console.log(status.token);
  return api
    .get("/auth/user", {
      headers: {
        Authorization: `x-auth-token=${status.token}`,
      },
    })
    .then((res) => {
      console.log("Result Obtained");
    })
    .catch((error) => {
      console.error(error);
    });
}
