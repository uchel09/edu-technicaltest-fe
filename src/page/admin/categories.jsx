import {  useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCreateCategory } from "../../store/slice/globalSlice";
import {  setDeleteCategory, setEditCategory } from "../../store/slice/categoriesSlice";

const AdminCategoryPage = () => {
  const dispatch = useDispatch()
 const {categories} = useSelector((state)=>state.category)
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loadEdit, setLoadEdit] = useState(false)

  

  const toggleCategory = (id) => {
    setActiveCategoryId((prev) => (prev === id ? null : id));
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/categories/${id}`);
        dispatch(setDeleteCategory({id}))
        toast.success("Kategori berhasil dihapus");
      } catch (error) {
        console.error(error);
        toast.error("Gagal menghapus kategori");
      }
    }
  };

  const startEditing = (category) => {
    setEditingCategoryId(category._id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategoryId(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    try {
      setLoadEdit(true)
      const res = await axios.put(
        `http://localhost:8000/api/v1/categories/${id}`,
        {
          name: editName,
        }
      );
      dispatch(setEditCategory({id,newName: res.data.data.name}))
      toast.success("Kategori berhasil diperbarui");
      cancelEditing();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui kategori");
    }finally{
      setLoadEdit(false)
    }
  };

  return (
    <AdminLayout page="/admin/categories">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="w-full text-center font-bold text-[25px] sticky top-0 bg-white z-10 py-3 flex justify-between px-4">
          <span>Your Categories</span>
          <button onClick={()=>{dispatch(setOpenCreateCategory(true)); }} type="button"  className="text-[16px] hover:shadow-purple-400 hover:shadow-md text-white rounded py-2 px-3 from-purple-400 via-pink-500 to-red-500 bg-gradient-to-r">
            Create Category
          </button>
        </div>

        {/* Daftar Kategori */}
        <div className="w-full flex-1 gap-3 my-2 flex flex-col overflow-y-auto px-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col gap-2 bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-md"
            >
              {editingCategoryId === category._id ? (
                // Edit Form
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => saveEdit(category._id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Display Mode
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">{category.name}</p>
                  <div className="flex gap-2">
                    <button
                    disabled={loadEdit}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      onClick={() => startEditing(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => toggleCategory(category._id)}
                    >
                      {activeCategoryId === category._id
                        ? "Hide Code"
                        : "Show Code"}
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Menampilkan Code jika kategori aktif */}
              {activeCategoryId === category._id && (
                <div className="mt-2">
                  <p>
                    <strong>Code:</strong> {category.code}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoryPage;
