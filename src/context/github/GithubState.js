import React, { useReducer } from "react";
import axios from "axios";
import GitHubContext from "./githubContext";
import GithubReducer from "./GithubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../typestypes";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
      }}>
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GithubState