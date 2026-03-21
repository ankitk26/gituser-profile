import axios from "axios";
import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  CLEAR_ALL,
  CLEAR_ERROR,
  SET_ERROR,
  START_FETCHING,
  USER_FETCH_ERROR,
  USER_FETCH_SUCCESS,
  USER_REPOS_SUCCESS,
} from "./actions";
import reducer from "./reducer";

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string;
  hireable: boolean;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  clone_url: string;
  watchers: number;
  forks: number;
  owner: { login: string };
}

interface UserContextValue {
  user: GithubUser | null;
  error: string | null;
  loading: boolean;
  repos: GithubRepo[] | null;
  fetchUser: (input: string) => Promise<void>;
  fetchRepos: (user: string, page: number) => Promise<void>;
  setError: (message: string) => void;
  clearError: () => void;
  clearAll: () => void;
}

const initialState = {
  user: null,
  error: null,
  loading: false,
  repos: null,
};

export const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "https://api.github.com/users";

  const fetchUser = async (input: string) => {
    dispatch({ type: START_FETCHING });
    try {
      const { data } = await axios.get<GithubUser>(`${BASE_URL}/${input}`);
      dispatch({ type: USER_FETCH_SUCCESS, payload: { user: data } });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_FETCH_ERROR, payload: { error: "No user found" } });
    }
  };

  const fetchRepos = async (user: string, page: number) => {
    dispatch({ type: START_FETCHING });
    try {
      const { data } = await axios.get<GithubRepo[]>(
        `${BASE_URL}/${user}/repos?page=${page}`
      );
      dispatch({ type: USER_REPOS_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const setError = (message: string) => {
    dispatch({ type: SET_ERROR, payload: message });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        fetchUser,
        fetchRepos,
        setError,
        clearError,
        clearAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
