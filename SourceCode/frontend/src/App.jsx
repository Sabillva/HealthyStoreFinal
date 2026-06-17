import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Box } from "@mui/material"
import { useAuth } from "./context/AuthContext"

import Navbar from "./components/Navbar"

import ProductsPage from "./pages/ProductsPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import OrdersPage from "./pages/OrdersPage"

import AdminPage from "./pages/AdminPage"
import AdminProductsPage from "./pages/AdminProductsPage"
import AdminOrdersPage from "./pages/AdminOrdersPage"

import SuccessPage from "./pages/SuccessPage"
import CancelPage from "./pages/CancelPage"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

const AUTH_ROUTES = ["/login", "/register"]

function Layout() {
  const location = useLocation()
  const { user, isAdmin } = useAuth()
  const hideNavbar = AUTH_ROUTES.includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Box component="main" sx={{ minHeight: hideNavbar ? "100vh" : "calc(100vh - 68px)" }}>
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/products" : "/login"} replace />} />

          <Route path="/login" element={user ? <Navigate to="/products" replace /> : <LoginPage />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/products" replace /> : <RegisterPage />}
          />

          <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" replace />} />
          <Route
            path="/products/:id"
            element={user ? <ProductDetailsPage /> : <Navigate to="/login" replace />}
          />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" replace />} />
          <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" replace />} />

          <Route
            path="/admin"
            element={user ? (isAdmin ? <AdminPage /> : <Navigate to="/products" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin/products"
            element={user ? (isAdmin ? <AdminProductsPage /> : <Navigate to="/products" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin/orders"
            element={user ? (isAdmin ? <AdminOrdersPage /> : <Navigate to="/products" replace />) : <Navigate to="/login" replace />}
          />

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </Box>
    </>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) return null

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
