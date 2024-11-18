// src/redux/reducer.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  users: [],
  error: ""
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.data.filter(user => user.id !== action.payload)
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.data.map(
          user => (user.id === action.payload.id ? action.payload : user)
        )
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
