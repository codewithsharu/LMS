// src/actions/userActions.js

import axios from 'axios';

// Action to fetch user details (branch, role)
export const fetchUserDetails = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3007/user-data", {
      headers: {
        Authorization: `Bearer ${token}`, // Correctly formatted header
      },
    });

    dispatch({
      type: "FETCH_USER_DETAILS_SUCCESS",
      payload: response.data, // Assuming response contains { branch, role }
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_DETAILS_FAILURE",
      payload: error.message,
    });
  }
};

// Action to fetch user data (name, empId, etc.)
export const fetchUserData = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3007/user-data", {
      headers: {
        Authorization: `Bearer ${token}`, // Correctly formatted header
      },
    });

    dispatch({
      type: "FETCH_USER_DATA_SUCCESS",
      payload: response.data, // Assuming response contains { name, empId, etc. }
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_DATA_FAILURE",
      payload: error.message,
    });
  }
};

// Action to set user role
export const setUserRole = (role) => {
  return {
    type: "SET_USER_ROLE",
    payload: role,
  };
};

// Action to set authenticated status
export const setAuthenticated = (status) => {
  return {
    type: "SET_AUTHENTICATED",
    payload: status,
  };
};

// Action to clear user data
export const clearUserData = () => {
  return {
    type: "CLEAR_USER_DATA",
  };
};
