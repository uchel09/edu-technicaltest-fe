import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./page/login";
import HomePage from "./page/home";
import AdminPage from "./page/admin/main";
import AdminProductsPage from "./page/admin/products";
import AdminCategoryPage from "./page/admin/categories";
import AdminOrdersPage from "./page/admin/orders";
import AdminSettingPage from "./page/admin/settings";
import AdminCustomerPage from "./page/admin/customer";
import RegisterPage from "./page/register";
import useCategories from "./hooks/getCategiries";
import useProducts from "./hooks/getProducts";

function App() {
  useCategories()
  useProducts()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/categories" element={<AdminCategoryPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/settings" element={<AdminSettingPage />} />
          <Route path="/admin/customers" element={<AdminCustomerPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;
