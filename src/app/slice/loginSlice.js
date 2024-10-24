import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const initialState = {
  token: getCookie('token') ?? '',
  username: getCookie('username') ?? '' // Fetch username from cookies
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    createToken: (oldState, data) => {
      console.log(data);
      // Destructure token and username from payload
      const { token, username } = data.payload;
      oldState.token = token;
      oldState.username = username; // Set username in the state
      // Set token and username in cookies
      setCookie('token', token);
      setCookie('username', username); // Store username in cookies
    },
    logOut: (state) => {
      state.token = '';
      state.username = ''; // Clear username from state
      deleteCookie('token');
      deleteCookie('username'); // Remove username from cookies
    }
  }
});

// Action creators are generated for each case reducer function
export const { createToken, logOut } = loginSlice.actions;

export default loginSlice.reducer;
