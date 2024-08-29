import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    updateUserProfile(state, action) {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
});

export const { setUserProfile, updateUserProfile, clearUserProfile } =
  userSlice.reducer;
export default userSlice.reducer;
