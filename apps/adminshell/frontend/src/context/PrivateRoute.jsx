import { useAuth } from "./AuthContext";
import { Navigate } from "react-router";

export default function PrivateRoute({ children, allowedRoles }) {
    const { isLoading, isSignIn, adminType } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        if (!isSignIn) {
            return <Navigate to="/login" replace />;
        }
    }

    if (allowedRoles && !allowedRoles.includes(adminType)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}