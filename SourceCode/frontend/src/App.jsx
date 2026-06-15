import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage
from "./pages/CartPage";
import OrdersPage
from "./pages/OrdersPage";
import AdminPage
from "./pages/AdminPage";
import AdminProductsPage
from "./pages/AdminProductsPage";
import AdminOrdersPage
from "./pages/AdminOrdersPage";
import SuccessPage
from "./pages/SuccessPage";
import CancelPage
from "./pages/CancelPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/orders"
          element={<OrdersPage />}
        />

        <Route
  path="/admin"
  element={<AdminPage />}
/>

<Route
  path="/admin/products"
  element={
    <AdminProductsPage />
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminOrdersPage />
  }
/>

<Route
  path="/success"
  element={
    <SuccessPage />
  }
/>

<Route
  path="/cancel"
  element={
    <CancelPage />
  }
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;