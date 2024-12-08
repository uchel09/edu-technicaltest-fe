import { jwtDecode } from "jwt-decode";

export const getUser = (token) => {
  const decoded = jwtDecode(token);
  return decoded.user;
};
