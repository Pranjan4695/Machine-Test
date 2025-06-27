import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    email: "",
    password: "",
  },
};

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state, param) => {
      console.log("param", param);
      const { payload } = param;
      state.userDetails = payload;
    },
    logoutUser: (state) => initialState,
  },
});

/**ACTIONS FOR SLICE*/
// eslint-disable-next-line import/no-unused-modules
export const { userDetails, logoutUser } = UserSlice.actions;
