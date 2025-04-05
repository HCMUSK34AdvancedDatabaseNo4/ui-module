import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../redux/hooks.ts";

const AdminProtectedRoute: FC = () => {
  const isSeller = useAppSelector((state) => state.authReducer.isLoggedIn && state.authReducer.role === 'SELLER');
  return isSeller ? <Outlet /> : <Navigate to="/403" />;
};

export default AdminProtectedRoute;
