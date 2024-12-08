import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
import globalReducer from "./slice/globalSlice"
import categoryReducer from "./slice/categoriesSlice"
import productReducer from "./slice/productsSlice"


const store = configureStore({
  reducer: {
    user:userReducer,
    global:globalReducer,
    category:categoryReducer,
    product:productReducer
  },
});

export default store;
