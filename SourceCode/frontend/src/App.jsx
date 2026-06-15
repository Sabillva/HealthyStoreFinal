import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase"

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

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter>
      <Navbar />

      <Box component="main" sx={{ minHeight: "calc(100vh - 64px)" }}>
        <Routes>

          {/* ROOT → LOGIN */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* PUBLIC */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PROTECTED USER ROUTES */}
          <Route
            path="/products"
            element={user ? <ProductsPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/products/:id"
            element={user ? <ProductDetailsPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/orders"
            element={user ? <OrdersPage /> : <Navigate to="/login" />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={user ? <AdminPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/admin/products"
            element={user ? <AdminProductsPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/admin/orders"
            element={user ? <AdminOrdersPage /> : <Navigate to="/login" />}
          />

          {/* PAYMENT RESULT PAGES (public) */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />

        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App