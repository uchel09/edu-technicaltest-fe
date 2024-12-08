import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isZoomOut: false,
    openCreateCategory: false,
    openCreateProduct: false,
    openEditProduct: false,
  },
  reducers: {
    setIsZoomOUt: (state, action) => {
      state.isZoomOut = action.payload;
    },
    setOpenCreateCategory: (state, action) => {
      state.openCreateCategory = action.payload;
    },
    setOpenCreateProduct: (state, action) => {
      state.openCreateProduct = action.payload;
    },
    setOpenEditProduct: (state, action) => {
      state.openEditProduct = action.payload;
    },
  },
});

export const { setIsZoomOUt , setOpenCreateCategory, setOpenCreateProduct ,setOpenEditProduct } = globalSlice.actions;
export default globalSlice.reducer;
