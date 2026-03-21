import type { GithubUser, GithubRepo } from "./user-context";
import {
  USER_FETCH_ERROR,
  USER_REPOS_SUCCESS,
  USER_FETCH_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
  START_FETCHING,
  CLEAR_ALL,
} from "./actions";

export interface State {
  user: GithubUser | null;
  error: string | null;
  loading: boolean;
  repos: GithubRepo[] | null;
}

export type Action =
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof CLEAR_ERROR }
  | { type: typeof START_FETCHING }
  | { type: typeof USER_FETCH_SUCCESS; payload: { user: GithubUser } }
  | { type: typeof USER_FETCH_ERROR; payload: { error: string } }
  | { type: typeof USER_REPOS_SUCCESS; payload: GithubRepo[] }
  | { type: typeof CLEAR_ALL };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload, user: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case START_FETCHING:
      return { ...state, loading: true };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case USER_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case CLEAR_ALL:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        repos: null,
      };
    default:
      return state;
  }
};

export default reducer;
