import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  setDeleteProduct,
  setProductId,
} from "../../store/slice/productsSlice";
import AdminLayout from "../../components/layouts/AdminLayout";
import { setOpenCreateProduct, setOpenEditProduct } from "../../store/slice/globalSlice";

const AdminProductsPage = () => {

  const { products } = useSelector((state) => state.product, shallowEqual);
  const dispatch = useDispatch();

  const handleEditProduct = async (id) => {
    dispatch(setOpenEditProduct(true));
    dispatch(setProductId(id));
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
      dispatch(setDeleteProduct({ id }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <AdminLayout page="/admin/products">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="w-full text-center font-bold text-[25px] sticky top-0 bg-white z-10 py-3 flex justify-between px-4">
          <span>Your Products</span>
          <button
            onClick={() => {dispatch(setOpenCreateProduct(true))}}
            type="button"
            className="text-[16px] hover:shadow-purple-400 hover:shadow-md text-white rounded py-2 px-3 from-purple-400 via-pink-500 to-red-500 bg-gradient-to-r"
          >
            Create Product
          </button>
        </div>

        {/* Product List */}
        <div className="w-full flex-1 gap-3 my-2 flex flex-col overflow-y-auto px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center bg-white shadow-md rounded-md p-4"
              >
                <div>
                  <p className="font-bold text-lg">{product.name}</p>
                  <p className="text-gray-600">{product?.ct_id?.name}</p>
                  <p className="text-gray-600">Price: Rp.{product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
