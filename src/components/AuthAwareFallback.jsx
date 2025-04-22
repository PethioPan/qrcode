import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Adjust the import path if needed

function AuthAwareFallback() {
    const { user } = useAuth();

    // If authenticated, redirect to /product-gallery
    if (user) {
        return <Navigate to="/product-gallery" replace />;
    }

    // If not authenticated, redirect to /login
    return <Navigate to="/login" replace />;
}

export default AuthAwareFallback;
