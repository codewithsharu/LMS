// src/reducers/userReducer.js

const initialState = {
    name: '',
    empId: '',
    role: '',
    branch: '',
    employee_type: '',
    personalKey: '',
    loading: false,
    error: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_DATA_SUCCESS':
        return {
          ...state,
          ...action.payload, // Populate state with fetched user data
          loading: false,
        };
      case 'FETCH_USER_DATA_FAILURE':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  