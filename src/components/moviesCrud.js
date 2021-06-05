import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/movies`,
});

export function getMovies() {
  return api.get("/").then((res) => res.data);
}

export function getMovieDataById(id) {
  return api.get(`/${id}`).then((res) => res.data);
}
