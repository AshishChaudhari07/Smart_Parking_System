import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pagesAuth/AuthContext";


const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export default PrivateRoute;
