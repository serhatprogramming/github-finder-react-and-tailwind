import { createContext, useReducer } from "react";
import githubreducer from "./GithubReducer";

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubreducer, initialState);

  // Get Search Results
  const searchUsers = async (text) => {
    setLoading(); //to set loading variable to true to show the loading gif

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      Authorization: `token ${GITHUB_TOKEN}`,
    });
    const { items } = await response.json();
    dispatch({ type: "GET_USERS", payload: items });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  // Get single user
  const getUser = async (login) => {
    setLoading(); //to set loading variable to true to show the loading gif
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      method: "GET",
      Authorization: `token ${GITHUB_TOKEN}`,
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const user = await response.json();
      dispatch({ type: "GET_USER", payload: user });
    }
  };

  // Get repos Results
  const getUserRepos = async (login) => {
    setLoading(); //to set loading variable to true to show the loading gif

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        method: "GET",
        Authorization: `token ${GITHUB_TOKEN}`,
      }
    );
    const data = await response.json();
    dispatch({ type: "GET_USER_REPOS", payload: data });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
