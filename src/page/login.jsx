import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadLogin, setLoadLogin] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email) return toast.error("email tidak boleh kosong") 
    if(!password) return toast.error("password tidak boleh kosong ")
    try {
      setLoadLogin(true)
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/admin")
    } catch (error) {
      console.log(error.status);
      toast.error("Login failed");
    }finally{
      setLoadLogin(false)
    }
  };

  
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 ">
      <div className="w-[400px] shad h-[400px] rounded-xl bg-white flex flex-col justify-center items-center shadow-black shadow-xl">
        <h1 className="text-[25px] font-bold">LOGIN</h1>
        <p>Sign your account</p>
        <form
          className="w-full py-[40px] px-[40px] gap-3 flex flex-col"
          onSubmit={handleLogin}
        >
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

            <div className="my-2">
              Belum punya akun ? <Link to="/register" className="text-blue-500">Register</Link>
            </div>
          <button
            type="submit"
            className="text-center w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 rounded-full text-white"
            disabled={loadLogin}
          >
            {loadLogin ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
