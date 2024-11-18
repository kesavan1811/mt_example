// src/redux/actions.js
import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "../constants/actionTypes";

export const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};

export const fetchUsersSuccess = users => {
  return { type: FETCH_USERS_SUCCESS, payload: users };
};

export const fetchUsersFailure = error => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};

// Async action creator to fetch the list of users
export const fetchUsers = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get("https://reqres.in/api/users");
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const addUserRequest = () => ({
  type: ADD_USER_REQUEST
});

// Add user success (API call successful)
export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

// Add user failure (API call failed)
export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  payload: error
});

// Thunk for adding user (makes the API call)
export const addUser = userData => {
  return async dispatch => {
    dispatch(addUserRequest());
    try {
      const response = await axios.post(
        "https://reqres.in/api/users",
        userData
      );
      dispatch(addUserSuccess(response.data)); // Successful API call
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(addUserFailure(error.message)); // API call failed
    }
  };
};

// Action to start deleting user (request state)
const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST
});

// Action for successful deletion
const deleteUserSuccess = userId => ({
  type: DELETE_USER_SUCCESS,
  payload: userId
});

// Action for failed deletion
const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  payload: error
});

//To delete a user
export const deleteUser = userId => {
  return async dispatch => {
    dispatch(deleteUserRequest());
    try {
      const response = await axios.delete(
        `https://reqres.in/api/users/${userId}`
      );
      if (response.status === 204) {
        dispatch(deleteUserSuccess(userId));
      }
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};

// Action to start the update process (loading state)
const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
});

// Action for successful update
const updateUserSuccess = updatedUser => ({
  type: UPDATE_USER_SUCCESS,
  payload: updatedUser
});

// Action for failed update
const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});

// To update a user
export const updateUser = (userId, updatedData) => {
  return async dispatch => {
    dispatch(updateUserRequest());

    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userId}`,
        updatedData
      );

      if (response.status === 200) {
        dispatch(updateUserSuccess(response.data));
      } else {
        throw new Error("Failed to update user");
      }
      dispatch(fetchUsers());
    } catch (error) {
      // Dispatch failure if the API call fails
      dispatch(updateUserFailure(error.message));
    }
  };
};
