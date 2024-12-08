import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenCreateCategory } from "../../store/slice/globalSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { setAddCategory } from "../../store/slice/categoriesSlice";

const ModalCreateCategory = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if(!code || !name){
        return toast.error("semua field harus diisi")
    }
    try {
      const res = await axios.post("http://localhost:8000/api/v1/categories", {
        code,
        name,
      });
      dispatch(setAddCategory(res.data.data))
      toast.success("Category created")
      setCode("")
      setName("")
    } catch (error) {
      console.log(error);
      toast.error("Gagal membuat category baru");
    }
  };
  return (
    <div className=" left-0 top-0 right-0 bottom-0 fixed z-[999]  flex items-center justify-center">
      <div
        className="w-full h-screen bg-black opacity-30 absolute"
        onClick={() => dispatch(setOpenCreateCategory(false))}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50 }} // Atur posisi awal dan opasitas
        animate={{ opacity: 1, y: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
        exit={{ opacity: 0, y: -50 }} // Atur posisi dan opasitas saat komponen di-unmount
        transition={{ duration: 0.5 }}
        className="w-[400px] bg-white z-[998] flex flex-col px-6 py-10 rounded-lg gap-5"
      >
        <p className="font-bold"> What category do you create ?</p>
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
          <label className="text-[15px] font-bold"> Category Name :</label>
          <input
            className="border w-full border-slate-400 focus:outline-none focus:border-black px-3 py-2 rounded-full"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleCreate}
          type="button"
          className="text-[16px] rounded-full hover:shadow-purple-400 hover:shadow-md text-white  py-3 px-3 from-purple-400 via-pink-500 to-red-500 bg-gradient-to-r"
        >
          Create Category
        </button>
      </motion.div>
    </div>
  );
};

export default ModalCreateCategory;
