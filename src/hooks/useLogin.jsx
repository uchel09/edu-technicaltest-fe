import { useEffect } from "react";
import { getUser } from "../utils/jwtdecode";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const login = async () => {
      if (token) {
        await dispatch(setUser(getUser(token)));
      } else {
        navigate("/login")
      }
    };

    login()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
