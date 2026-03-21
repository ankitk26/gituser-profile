export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const START_FETCHING = "START_FETCHING";
export const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS";
export const USER_FETCH_ERROR = "USER_FETCH_ERROR";
export const USER_REPOS_SUCCESS = "USER_REPOS_SUCCESS";
export const CLEAR_ALL = "CLEAR_ALL";

export type ActionType =
  | typeof SET_ERROR
  | typeof CLEAR_ERROR
  | typeof START_FETCHING
  | typeof USER_FETCH_SUCCESS
  | typeof USER_FETCH_ERROR
  | typeof USER_REPOS_SUCCESS
  | typeof CLEAR_ALL;
