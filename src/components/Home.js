import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./home.scss";
import { getUser } from "./login/loginCrud";
import { getMovies } from "./moviesCrud";

const Home = () => {
  let history = useHistory();

  const [movies, setMovies] = useState();

  const fetchMovieData = async () => {
    let movieData = await getMovies();
    setMovies(movieData);
  };

  const fetchUserData = async () => {
    let userData = await getUser();
    console.log(`userData : `, userData);
  };

  useEffect(() => {
    fetchMovieData();
    fetchUserData();
  }, []);

  const bookTicket = (id) => {
    var status = JSON.parse(localStorage.getItem("loginStatus"));
    if (status.signedIn) {
      history.push(`/${id}`);
    }
  };

  return (
    <>
      <div className="main">
        <div className="card-body-main">
          {movies?.length > 0 &&
            movies?.map((movie) => {
              return (
                <>
                  <div class="card">
                    <img
                      src={movie.posterImg}
                      alt="movieImg"
                      style={{
                        width: "50%",
                        border: "round",
                        borderRadius: "10px",
                      }}
                    />
                    <div class="container">
                      <p>{movie.movieName}</p>
                      <div
                        style={{
                          minHeight: "40%",
                          backgroundColor: "transparent",
                        }}
                      >
                        <span>
                          <span style={{ fontWeight: "bold" }}>Genre : </span>
                          {movie.genre}
                        </span>
                        <br />
                        <span>
                          <span style={{ fontWeight: "bold" }}>
                            Category :{" "}
                          </span>
                          {movie.category}{" "}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          bookTicket(movie._id);
                        }}
                      >
                        Book Ticket
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
