import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDataById } from "./moviesCrud";

const BookTickets = () => {
  let { id } = useParams();

  const [movieData, setMovieData] = useState();

  const fetchMovieData = async () => {
    const movData = await getMovieDataById(id);
    console.log(movData);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

export default BookTickets;
