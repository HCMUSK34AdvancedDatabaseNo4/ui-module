import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../redux/hooks.ts";

const ProtectedRoute: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn && state.authReducer.role === 'CUSTOMER');
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
