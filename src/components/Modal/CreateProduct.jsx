import { motion } from "framer-motion";
import {  useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setOpenCreateProduct } from "../../store/slice/globalSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";

import { setAddProducts } from "../../store/slice/productsSlice";

const ModalCreateProduct = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category, shallowEqual);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ct_id, setCtgId] = useState(null);

  

  const handleEdit = async () => {
    if (!code || !name || !price || !ct_id) {
      return toast.error("Semua field harus diisi");
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/products`,
        {
          code,
          name,
          price,
          ct_id: ct_id.value,
        }
      );
      dispatch(setAddProducts(res.data.data));
      setName("")
      setCode("")
      setCtgId("")
      setPrice(0)
      toast.success("Create Product Successfully");

    } catch (error) {
      console.log(error);
      toast.error("Gagal Mengedit Product");
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <div className="left-0 top-0 right-0 bottom-0 fixed z-[999] flex items-center justify-center">
      <div
        className="w-full h-screen bg-black opacity-30 absolute"
        onClick={() => dispatch(setOpenCreateProduct(false))}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="w-[400px] bg-white z-[998] flex flex-col px-6 py-10 rounded-lg gap-5"
      >
        <h1>Create Product</h1>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[15px] font-bold"> Code :</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border w-full border-slate-400 focus:border-black focus:outline-none px-3 py-2 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[15px] font-bold"> Product Name :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full border-slate-400 focus:border-black focus:outline-none px-3 py-2 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[15px] font-bold"> Price :</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full border-slate-400 focus:border-black focus:outline-none px-3 py-2 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[15px] font-bold"> Category :</label>
          <Select
            options={categoryOptions}
            value={ct_id}
            onChange={(selectedOption) => setCtgId(selectedOption)}
            placeholder={ct_id}
          />
        </div>
        <button
          onClick={handleEdit}
          type="button"
          className="text-[16px] rounded-full hover:shadow-purple-400 hover:shadow-md text-white py-3 px-3 from-purple-400 via-pink-500 to-red-500 bg-gradient-to-r"
        >
          Create Product
        </button>
      </motion.div>
    </div>
  );
};

export default ModalCreateProduct;
