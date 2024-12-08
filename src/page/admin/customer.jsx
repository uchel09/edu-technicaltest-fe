import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { shallowEqual, useSelector } from "react-redux";

const AdminCustomerPage = () => {
  const { user } = useSelector((state) => state.user, shallowEqual);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeAddressId, setActiveAddressId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/users");

          // Filter untuk tidak menampilkan user dengan ID yang sama seperti user._id
          const filteredUsers = res.data.data.filter(
            (item) => item._id !== user._id
          );

          setUsers(filteredUsers);
        } catch (error) {
          console.error(error);
          toast.error("Gagal memuat data users atau customer");
        }
      }
    };

    getUsers();
  }, [user]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/v1/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("Customer berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus customer");
    } finally {
      setLoading(false);
    }
  };

  const toggleAddressVisibility = (userId) => {
    setActiveAddressId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <AdminLayout page="/admin/customers">
      <div className="flex flex-col h-full">
        {/* Header*/}
        <h1 className="w-full text-center font-bold text-[25px] sticky top-0 bg-white z-10 py-3">
          Your Customers
        </h1>

        {/* Users  */}
        <div className="w-full flex-1 gap-3 my-2 flex flex-col overflow-y-auto">
          {users.length > 0 ? (
            users.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-white shadow-md  rounded-md p-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-gray-600">{item.email}</p>
                    <p className="text-gray-600">{item.phone_number}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAddressVisibility(item._id)}
                      className="px-4 py-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500  text-white rounded-full hover:bg-purple-600 transition"
                    >
                      {activeAddressId === item._id
                        ? "Hide Address"
                        : "Show Address"}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Hanya tampilkan address jika activeAddressId === item._id */}
                {activeAddressId === item._id && (
                  <div className="mt-3 bg-gray-100 p-3  rounded-md text-sm">
                    <p>
                      <span className="font-semibold">Street:</span>{" "}
                      {item?.address?.street || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">City:</span>{" "}
                      {item?.address?.city || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Province:</span>{" "}
                      {item?.address?.province || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Postal Code:</span>{" "}
                      {item?.address?.postal_code || "-"}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Belum ada customer.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerPage;
