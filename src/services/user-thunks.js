import * as service from './userService';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../userSlice'; // Import the setUser action


export const fetchUserByIdThunk = createAsyncThunk(
  'user/fetchUserById',
  async (id , { dispatch }) => {
    console.log('fetchUserByUsernameThunk');
    console.log(id);
    const user = await service.fetchUserById(id);
        dispatch(setUser(user)); // Dispatch the setUser action with the user data
    return user;
  }
);
