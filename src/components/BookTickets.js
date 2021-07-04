import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDataById } from "./moviesCrud";
import { getUser } from "./login/loginCrud";
import "./booking.scss";

const BookTickets = () => {
  let { id } = useParams();

  const [movieData, setMovieData] = useState();
  const [userData, setUserData] = useState();
  const [movieDate, setMovieDate] = useState();

  const fetchMovieData = async () => {
    const movData = await getMovieDataById(id);
    setMovieData(movData);
    convertDate(movData.movieDateAndTime);
  };

  const fetchUserData = async () => {
    const temp = await getUser();
    setUserData(temp);
  };

  const convertDate = (utcDate) => {
    var date = new Date(utcDate);
    setMovieDate(date.toString().split(" ").slice(0, 4).join(" "));
  };

  useEffect(() => {
    fetchMovieData();
    fetchUserData();
  }, []);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);
  const [seatSelected, setSeatSelected] = useState([]);

  const bookedTickets = (charVal, intVal) => {
    const str = `${charVal} ${intVal}`;
    var arr = [...seatSelected, str];
    arr.sort();
    setSeatSelected(arr);
    calcCost(arr);
  };

  const removeTicket = (charVal, intVal) => {
    const str = `${charVal} ${intVal}`;
    const index = seatSelected.indexOf(str);
    var arr = [...seatSelected];
    if (index > -1) {
      arr.splice(index, 1);
    }
    arr.sort();
    setSeatSelected(arr);
    calcCost(arr);
  };

  const [totalCost, setTotalCost] = useState(0);

  const calcCost = (seats_arr) => {
    var silver_seat_count = 1;
    var gold_seat_count = 1;
    var plat_seat_count = 1;
    var silver = ["A", "B", "C", "D"];
    var gold = ["E", "F", "G", "H", "I", "J", "K"];

    seats_arr.map((seat) => {
      if (silver.some((i) => seat.split("").includes(i))) {
        silver_seat_count++;
      }
      if (gold.some((i) => seat.split("").includes(i))) {
        gold_seat_count++;
      }
      if (seat.split("").includes("L")) {
        plat_seat_count++;
      }
    });
    var total_cost =
      (silver_seat_count - 1) * movieData.silverSeatCost +
      (gold_seat_count - 1) * movieData.goldSeatCost +
      (plat_seat_count - 1) * movieData.platinumSeatCost;
    setTotalCost(total_cost);
  };

  const storeData = () => {
    var mov_name = movieData.movieName;
    var user_name = userData.userName;
    var ticketData = {
      user_name,
      mov_name,
      seatSelected,
      totalCost,
    };
    sessionStorage.setItem("ticketData", JSON.stringify(ticketData));
    //JSON.parse(sessionStorage.getItem("ticketData"));
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
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
            className="ticket-det-main"
            style={
              !isDesktop
                ? {
                    overflowY: "scroll",
                  }
                : {
                    overflow: "hidden",
                  }
            }
          >
            <div
              style={
                isDesktop
                  ? {
                      backgroundColor: "transparent",
                      width: "70%",
                      height: "80vh",
                    }
                  : {
                      backgroundColor: "transparent",
                      width: "100%",
                      overflowX: "auto",
                      overflowY: "hidden",
                      whiteSpace: "nowrap",
                    }
              }
            >
              <div
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  width: "100%",
                }}
              >
                <span
                  className="span-props"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  L
                </span>
                <div
                  className={isDesktop ? "checkbox-align" : "checkbox-margin"}
                  style={!isDesktop ? { backgroundColor: "transparent" } : {}}
                >
                  {[...Array(29)].map((x, i) => (
                    <div className="seat-numbers">
                      <span className="seat-numbers-text">{i + 1}</span>
                      <input
                        type="checkbox"
                        value={i + 1}
                        onClick={(e) => {
                          e.target.checked
                            ? bookedTickets("L", i + 1)
                            : removeTicket("L", i + 1);
                        }}
                        style={!isDesktop ? { width: "12px" } : {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <br />
              {[...Array(7)].map((x, j) => (
                <div
                  style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <span className="span-props">
                    {String.fromCharCode(72 - j + 3)}
                  </span>
                  <div
                    className={isDesktop ? "checkbox-align" : "checkbox-margin"}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {[...Array(29)].map((x, i) => {
                      if (i == 4 || i == 5 || i == 23 || i == 24) {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              backgroundColor: "transparent",
                              width: "20px",
                            }}
                          >
                            &nbsp;
                          </span>
                        );
                      } else {
                        return (
                          <input
                            type="checkbox"
                            value={i + 1}
                            onClick={(e) => {
                              e.target.checked
                                ? bookedTickets(
                                    String.fromCharCode(72 - j + 3),
                                    i + 1
                                  )
                                : removeTicket(
                                    String.fromCharCode(72 - j + 3),
                                    i + 1
                                  );
                            }}
                            style={!isDesktop ? { width: "12px" } : {}}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              ))}

              <br />

              {[...Array(4)].map((x, j) => (
                <div
                  style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <span className="span-props">
                    {String.fromCharCode(68 - j)}
                  </span>
                  <div
                    className={isDesktop ? "checkbox-align" : "checkbox-margin"}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {[...Array(29)].map((x, i) => {
                      if (i == 4 || i == 5 || i == 23 || i == 24) {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              backgroundColor: "transparent",
                              width: "20px",
                            }}
                          >
                            &nbsp;
                          </span>
                        );
                      } else {
                        return (
                          <input
                            type="checkbox"
                            value={i + 1}
                            onClick={(e) => {
                              e.target.checked
                                ? bookedTickets(
                                    String.fromCharCode(68 - j),
                                    i + 1
                                  )
                                : removeTicket(
                                    String.fromCharCode(68 - j),
                                    i + 1
                                  );
                            }}
                            style={!isDesktop ? { width: "12px" } : {}}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
              <div className="screen">SCREEN</div>
            </div>
            <div
              style={
                isDesktop
                  ? {
                      backgroundColor: "transparent",
                      width: "30%",
                    }
                  : {
                      backgroundColor: "transparent",
                      width: "100%",
                      overflowX: "auto",
                      overflowY: "hidden",
                      whiteSpace: "nowrap",
                    }
              }
            >
              <div className="ticket-details">
                <p
                  className="ticket-det-styling"
                  style={{ fontWeight: "bold" }}
                >
                  You have chosen to watch
                </p>
                <p
                  className="ticket-det-styling"
                  style={{ fontSize: "x-large", fontWeight: "bold" }}
                >
                  {movieData?.movieName} ({movieData?.category}) <br />
                </p>
                <p className="ticket-det-styling">On {movieDate}</p>
                <br />
                {seatSelected.length > 0 && (
                  <>
                    <p
                      className="ticket-det-styling"
                      style={{ fontSize: "large" }}
                    >
                      Seats Selected : <br />
                      <span style={{ backgroundColor: "transparent" }}>
                        {" "}
                        {seatSelected.join()}{" "}
                      </span>
                    </p>
                    <br />
                    <br />
                    <p
                      className="ticket-det-styling"
                      style={{ fontSize: "large" }}
                    >
                      Total Cost : <br />
                      {totalCost}.00 {"\u20B9"}
                    </p>
                    <br />
                    <button
                      style={{ float: "none" }}
                      onClick={() => storeData()}
                    >
                      BOOK TICKET
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTickets;
