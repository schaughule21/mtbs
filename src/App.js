import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/login/UserLogin";
import BookTickets from "./components/BookTickets";
import Profile from "./components/Menu/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact={true} component={Login} />
        <Navbar />
        <Switch>
          <Route path="/Home" exact={true} component={Home} />
          <Route path="/book-ticket/:id" component={BookTickets} />
          <Route path="/my-profile" exact={true} component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
