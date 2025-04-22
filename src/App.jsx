import { Routes, Route } from "react-router-dom";
import ProductGalleryPage from "./pages/ProductGalleryPage";
import ProductGalleryDetailPage from "./pages/ProductGalleryDetailPage";
import LoginPage from "./pages/LoginPage";
import CarouselPage from "./pages/CarouselPage";
import { ProtectedRoute } from "./hooks/useAuth";
import { AuthProvider } from "./hooks/useAuth";
import AuthAwareFallback from "./components/AuthAwareFallback";
import './main.css';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/product-gallery"
                    element={
                        <ProtectedRoute>
                            <ProductGalleryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product-gallery/:id"
                    element={
                        <ProtectedRoute>
                            <ProductGalleryDetailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product-gallery/:id/carousel"
                    element={
                        <ProtectedRoute>
                            <CarouselPage />
                        </ProtectedRoute>
                    }
                />
                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<AuthAwareFallback />} />
            </Routes>
        </AuthProvider>
    );
}
