/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setProducts } from "../store/slice/productsSlice";

const useProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/products");
        dispatch(setProducts(res.data.data));
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data kategori");
      }
    };

    getCategories();
  }, []);
};

export default useProducts;
