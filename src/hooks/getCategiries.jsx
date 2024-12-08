/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCategories } from "../store/slice/categoriesSlice";

const useCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/categories");
        dispatch(setCategories(res.data.data));
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data kategori");
      }
    };

    getCategories();
  }, []);
};

export default useCategories;
