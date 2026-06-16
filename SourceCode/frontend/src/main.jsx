import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider, CssBaseline } from "@mui/material"
import App from "./App"
import theme from "./theme"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
