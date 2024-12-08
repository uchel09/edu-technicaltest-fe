/* eslint-disable react/prop-types */
import {
  Home,
  ShoppingCart,
  Package,
  List,
  Settings,
  LogOut,
  User2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsZoomOUt } from "../../store/slice/globalSlice";

import { useLogin } from "../../hooks/useLogin";
import { AnimatePresence } from "framer-motion";
import ModalCreateCategory from "../Modal/CreateCategory";
import ModalEditProducts from "../Modal/EditProduct";
import ModalCreateProduct from "../Modal/CreateProduct";

const AdminLayout = ({ children, page }) => {
  useLogin();
  const dispatch = useDispatch();

  const { isZoomOut, openCreateCategory,openEditProduct,openCreateProduct } = useSelector(
    (state) => state.global,
    shallowEqual
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home />, href: "/admin" },
    { name: "Products", icon: <Package />, href: "/admin/products" },
    { name: "Orders", icon: <ShoppingCart />, href: "/admin/orders" },
    { name: "Categories", icon: <List />, href: "/admin/categories" },
    { name: "Customers", icon: <User2 />, href: "/admin/customers" },
    { name: "Settings", icon: <Settings />, href: "/admin/settings" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleZoom = () => {
    if (isZoomOut === false) {
      dispatch(setIsZoomOUt(true));
    } else {
      dispatch(setIsZoomOUt(false));
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="flex h-screen from-purple-400 via-pink-500 to-red-500 bg-gradient-to-r overflow-hidden">
      <AnimatePresence>
        {openCreateCategory && <ModalCreateCategory />}
        {openEditProduct && <ModalEditProducts />}
        {openCreateProduct && <ModalCreateProduct />}
      </AnimatePresence>
      {/* Sidebar */}
      <div
        className={`overflow-y-auto bg-gradient-to-r from-purple-400  via-pink-500 to-red-500 rounded-r-[25px] fixed md:static top-0 left-0 h-full w-64 
            ${
              isZoomOut
                ? "md:w-[75px] md:transition-all"
                : "w-64 md:transition-all"
            } transform
             ${
               isSidebarOpen ? "translate-x-0" : "-translate-x-full"
             } transition-transform duration-500 ease-in-out md:translate-x-0 md:block z-50 text-white`}
      >
        <div className="flex items-center static justify-center h-16 border-b border-blue-500">
          <h1 className={`text-2xl  ${isZoomOut && "md:hidden"} font-bold`}>
            Admin
          </h1>
          <Menu
            onClick={handleZoom}
            className="absolute hidden md:block right-3 cursor-pointer"
          />
        </div>
        <nav className={`flex-1 px-4 py-6 space-y-2 flex flex-col`}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-4 p-2 text-sm font-medium rounded ${
                page === item.href && "bg-purple-300 translate-x-2"
              } hover:bg-purple-400 hover:translate-x-2 transition-transform 
                duration-500 ease-in-out`}
            >
              {item.icon}
              <span className={`${isZoomOut && "md:hidden"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-blue-500 py-4 px-4 flex flex-col mt-12">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-3 bg-black hover:shadow-gray-700 shadow-lg text-sm font-medium rounded hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <LogOut />
            <span className={`${isZoomOut && "md:hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-2 rounded focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 m-4 rounded-[20px] md:rounded-[30px] p-4 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
