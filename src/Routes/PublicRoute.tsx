import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token) {

        switch (user.role) {

            case "ADMIN":
                return <Navigate to="/admin" replace />;

            case "DOCTOR":
                return <Navigate to="/doctor" replace />;

            case "PATIENT":
                return <Navigate to="/patient" replace />;

            default:
                return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default PublicRoute;