import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import "./App.css";
import GithubState from './context/github/GithubState'
import axios from "axios";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [alert, setAlert] = useState(null);

  // populates default users
  // async componentDidMount() {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   setUsers(res.data);
  //   setLoading(false);
  // }


  // Get users repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };


  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type
    });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
    <Router>
      <div className="App">
        <Navbar> </Navbar>
        <div className="container">
          <Alert alert={alert}></Alert>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search

                    setAlert={showAlert}></Search>
                  <Users></Users>
                </Fragment>
              )}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUserRepos={getUserRepos}
                  repos={repos}></User>
              )}></Route>
          </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
  );
};

export default App;
