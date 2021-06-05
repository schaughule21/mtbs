import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/login/UserLogin";
import BookTickets from "./components/BookTickets";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <div>
          <Navbar />
          <Route path="/Home" exact={true} component={Home} />
          <Route path="/:id" component={BookTickets} />
          {/*<Route path="/users">
      <Users />
    </Route> */}
        </div>
      </Switch>
    </Router>
  );
}

export default App;
