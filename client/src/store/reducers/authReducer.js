const initialState = {
  token: null,
  empId: null,
  role: null,
  name: null,
  branch: null,
  employee_type: null,
  personalKey: null,
  isAuthenticated: false,
  dataFetched: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      console.log('Setting user data:', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        dataFetched: true
      };
    case 'LOGOUT':
      console.log('Logging out');
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
