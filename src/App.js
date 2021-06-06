import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/UserLogin";
import BookTickets from "./components/BookTickets";
import Profile from "./components/Menu/Profile";
import ValidateUser from "./components/validateUser";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Login} />
      <Switch>
        <Route
          path="/Home"
          exact={true}
          render={() => (
            <ValidateUser>
              <Home></Home>
            </ValidateUser>
          )}
        />
        <Route
          path="/book-ticket/:id"
          render={() => (
            <ValidateUser>
              <BookTickets></BookTickets>
            </ValidateUser>
          )}
        />
        <Route
          path="/my-profile"
          render={() => (
            <ValidateUser>
              <Profile />
            </ValidateUser>
          )}
        />
        {/*<Route path="/users">
      <Users />
    </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
