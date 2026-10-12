import { Navigate, Outlet } from "react-router";

interface IAllowedRoles{
     allowedRoles:string[];
}
const ProtectedRoute = ({allowedRoles}:IAllowedRoles) => {
    const token = localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user")||"{}");
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user.role)){
          return <Navigate to="/login" replace/>;
    }

    return <Outlet />;
};

export default ProtectedRoute;