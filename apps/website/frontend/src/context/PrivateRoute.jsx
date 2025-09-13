import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
    const { isLoading, isSignIn, userType } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        if (!isSignIn) {
            return <Navigate to="/login" replace />;
        }
    }

    if (allowedRoles && !allowedRoles.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}