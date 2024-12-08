import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productId:""
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAddProducts: (state, action) => {
      state.products.push(action.payload);
    },
    setEditProduct:(state, action)=> {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? { ...product, ...action.payload } : product
      );
    },
    setDeleteProduct:(state, action) =>{
      const { id } = action.payload;
      state.products = state.products.filter(
        (category) => category._id !== id
      );
    },
    setProductId:(state,action) =>{
      state.productId =action.payload
    }
  },
});

export const {
  setProducts,
  setAddProducts,
  setEditProduct,
  setDeleteProduct,
  setProductId
} = productSlice.actions;
export default productSlice.reducer;
