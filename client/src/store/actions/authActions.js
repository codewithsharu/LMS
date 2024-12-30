import axios from 'axios';

export const fetchUserData = () => async (dispatch) => {
  const token = sessionStorage.getItem('jwtToken');
  
  if (token) {
    try {
      const response = await axios.get('http://localhost:3007/user-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch({
        type: 'SET_USER_DATA',
        payload: {
          ...response.data,
          token
        }
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});