const initialState = {
  token: null,
  empId: null,
  role: null,
  name: null,
  branch: null,
  employee_type: null,
  personalKey: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
