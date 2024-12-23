import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData : null,
}


const trail = createSlice({
  name: second,
  initialState,
  reducers: {
    setUserData(state, action) {
        state.userData = action.payload;
        },
  }
});

export const {} = trail.actions

export default trail.reducer