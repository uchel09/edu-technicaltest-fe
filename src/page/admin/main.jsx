import { shallowEqual, useSelector } from "react-redux";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminPage = () => {
  const { user } = useSelector((state) => state.user, shallowEqual);

  return (
    <AdminLayout page="/admin">
      {user && <h1>Hello {user.name}, How are you ?</h1>}
    </AdminLayout>
  );
};

export default AdminPage;
