import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAddCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setEditCategory(state, action) {
      const { id, newName } = action.payload;
      state.categories = state.categories.map((category) =>
        category._id === id ? { ...category, name: newName } : category
      );
    },
    setDeleteCategory(state, action) {
      const { id } = action.payload;
      state.categories = state.categories.filter(
        (category) => category._id !== id
      );
    },
  },
});

export const { setCategories, setAddCategory,setEditCategory,setDeleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
