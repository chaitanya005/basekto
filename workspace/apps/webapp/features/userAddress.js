import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userAddress: '',
  adminToken: '',
};

const userAddress = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {
    addUserAddress: (state, action) => {
      state.userAddress = action.payload.userAddress;
    },
    addAdminToken: (state, action) => {
      state.adminToken = action.payload.adminToken;
    },
  },
});

export const { addUserAddress, addAdminToken } = userAddress.actions;
export const getUserAddress = (state) => state.userAddress;
export const getAdminToken = (state) => state.adminToken;

export default userAddress.reducer;
