import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    customers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
