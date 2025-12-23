import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import SearchPage from "./pages/SearchPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import AdminRouteGuard from "./components/auth/AdminRouteGuard";

// Admin Pages
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminOrdersList from "./pages/admin/AdminOrdersList";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminProductNew from "./pages/admin/products/AdminProductNew";
import AdminProductEdit from "./pages/admin/products/AdminProductEdit";
import { ToastProvider } from "./components/toast/ToastProvider";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProductsList from "./pages/admin/products/AdminProductsList";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminUsers from "./pages/admin/AdminUsers";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>

            {/* ---------- Public Routes ---------- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/order/:id" element={<OrderTrackingPage />} />
            <Route path="/search" element={<SearchPage />} />


            {/* ---------- ADMIN ROUTES (Protected) ---------- */}
            <Route path="/admin/users" element={<AdminRouteGuard><AdminUsers/></AdminRouteGuard>} />
            <Route path="/admin/settings" element={<AdminRouteGuard><AdminSettings/></AdminRouteGuard>} />
            <Route path="/admin/customers" element={<AdminRouteGuard><AdminCustomers/></AdminRouteGuard>} />

            {/* Analytics */}
            <Route
              path="/admin/analytics"
              element={
                <AdminRouteGuard>
                  <AdminAnalytics />
                </AdminRouteGuard>
              }
            />

            {/* Inventory */}
            <Route
              path="/admin/inventory"
              element={
                <AdminRouteGuard>
                  <AdminInventory />
                </AdminRouteGuard>
              }
            />

            {/* Orders */}
            <Route
              path="/admin/orders"
              element={
                <AdminRouteGuard>
                  <AdminOrdersList />
                </AdminRouteGuard>
              }
            />

            <Route
              path="/admin/orders/:id"
              element={
                <AdminRouteGuard>
                  <AdminOrderDetails />
                </AdminRouteGuard>
              }
            />

            {/* Products */}
            <Route
              path="/admin/products"
              element={
                <AdminRouteGuard>
                  <AdminProductsList />
                </AdminRouteGuard>
              }
            />

            <Route
              path="/admin/products/new"
              element={
                <AdminRouteGuard>
                  <AdminProductNew />
                </AdminRouteGuard>
              }
            />

            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminRouteGuard>
                  <AdminProductEdit />
                </AdminRouteGuard>
              }
            />

          </Routes>

        </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
