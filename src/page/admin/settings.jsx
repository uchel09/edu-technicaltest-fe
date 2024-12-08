import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const AdminSettingPage = () => {
  const { user } = useSelector((state) => state.user,shallowEqual);

  // State lokal
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [loadUpdate, setLoadUpdate] = useState(false);

  // Mengupdate state lokal ketika `user` dari Redux berubah
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setId(user._id || "");
      setPhoneNumber(user.phone_number || "");
      setEmail(user.email || "");
      setProvince(user?.address?.province || "");
      setCity(user?.address?.city || "");
      setDistrict(user?.address?.district || "");
      setPostalCode(user?.address?.postal_code || "");
      setStreet(user?.address?.street || "");
    }
  }, [user]);

 const handleUpdate = async (e) => {
   e.preventDefault();
   if (
     !name ||
     !phone_number ||
     !email ||
     !province ||
     !city ||
     !district ||
     !street ||
     !postal_code
   ) {
     return toast.error("Semua Data Harus di isi");
   }

   try {
     setLoadUpdate(true);
    const res =  await axios.patch(`http://localhost:8000/api/v1/users/${id}`, {
       name,
       email,
       phone_number,
       address: {
         province,
         city,
         district,
         postal_code,
         street,
       },
     });

     console.log(res.data)
     localStorage.setItem("token", res.data.token)

     toast.success("Update Success");
   } catch (error) {
     toast.error(error?.response?.data?.message);
   } finally {
     setLoadUpdate(false);
   }
 };

  return (
    <AdminLayout page="/admin/settings">
      {user ? (
        <form
          className="w-full py-[10px] px-[40px] gap-4 flex overflow-y-auto flex-col"
          onSubmit={handleUpdate}
        >
          <div className="flex md:flex-row flex-col">
            <div className="w-full md:w-[50%] flex flex-col gap-2 px-3">
              <div className="w-full">
                <label>Name:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>No.Hp:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Email:</label>
                <input
                  type="email"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Section 2 */}
            <div className="w-full md:w-[50%] flex flex-col gap-2 px-3">
              <div className="w-full">
                <label>Provinsi:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Kota:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Kecamatan:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Jalan:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Kode Pos:</label>
                <input
                  type="text"
                  className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-center w-full hover:shadow-purple-500 hover:shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 rounded-full text-white"
            disabled={loadUpdate}
          >
            {loadUpdate ? "Loading" : "Edit Profile"}
          </button>
        </form>
      ) : (
        <div className="w-full h-full">Loading...</div>
      )}
    </AdminLayout>
  );
};

export default AdminSettingPage;
