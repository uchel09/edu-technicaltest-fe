import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [street, setStreet] = useState("");

  const [loadLogin, setLoadLogin] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !phone_number ||
      !email ||
      !password ||
      !province ||
      !city ||
      !district ||
      !street ||
      !postal_code
    ) {
      return toast.error("Semua Data Harus di isi");
    }

    try {
      setLoadLogin(true);
       await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          name,
          password,
          email,
          phone_number,
          address: {
            province,
            city,
            district,
            postal_code,
            street,
          },
        }
      );
      toast.success("Register Success");
      navigate("/login")

    } catch (error) {

      toast.error(error?.response?.data?.message);
    } finally {
      setLoadLogin(false);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-y-auto w-full h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 ">
      <div className="w-[400px] pt-3 h-[600px] rounded-xl bg-white flex flex-col justify-center items-center shadow-black shadow-xl">
        <h1 className="text-[25px] font-bold">Register</h1>
        <p>
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
        <form
          className="w-full py-[10px] px-[40px] gap-4 flex overflow-y-auto  flex-col"
          onSubmit={handleRegister}
        >
          <div className="w-full flex flex-col gap-2 px-3">
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
            <div className="w-full">
              <label>Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
              />
            </div>
            <div className="w-full border-t-2 mt-3 pt-3 text-[20px] font-bold">
              Alamat
            </div>
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
              <label>Kota</label>
              <input
                type="text"
                className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label>Kecamatan</label>
              <input
                type="text"
                className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label>Jalan</label>
              <input
                type="text"
                className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label>Kode Pos</label>
              <input
                type="text"
                className="px-3 py-1 w-full h-[40px] border rounded-full focus:outline-1 border-black"
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-center w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 rounded-full text-white"
            disabled={loadLogin}
          >
            {loadLogin ? "Loading" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
