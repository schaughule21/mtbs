import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDataById } from "./moviesCrud";
import "./booking.scss";

const BookTickets = () => {
  let { id } = useParams();

  const [movieData, setMovieData] = useState();

  const fetchMovieData = async () => {
    const movData = await getMovieDataById(id);
    setMovieData(movData);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      <div className="booking-main">
        <div className="booking-box">
          <div
            style={
              isDesktop
                ? {
                    display: "flex",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                  }
                : {}
            }
          >
            {isDesktop ? (
              <img
                src={movieData?.posterImg}
                alt="Movie theatre image"
                width="50%"
                style={{
                  height: `calc(100vh - 135px)`,
                  border: "round",
                  borderRadius: "10px",
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTickets;
