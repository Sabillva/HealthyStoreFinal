import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import api from "../services/api"
import { auth } from "../firebase/firebase"
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import AddIcon from "@mui/icons-material/Add"

function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext)
  const [toast, setToast] = useState(null)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0)

  const checkout = async () => {
    try {
      const response = await api.post(`/api/checkout?amount=${totalPrice}`)
      window.location.href = response.data.url
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckout = async () => {
    try {
      const requestBody = {
        userName: auth.currentUser?.email,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }

      const response = await api.post("/api/orders", requestBody)

      setToast({ severity: "success", message: "Order created successfully" })
      console.log(response.data)
      clearCart()
    } catch (error) {
      console.error(error)
      setToast({
        severity: "error",
        message: error.response?.data?.message || "Checkout failed",
      })
    }
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: "#eef3e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 3 }}>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Browse our products and add something healthy.
        </Typography>
        <Button component={Link} to="/products" variant="contained" size="large">
          Start shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Shopping Cart
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
      </Typography>

      <Grid container spacing={3}>
        {/* Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    component={Link}
                    to={`/products/${item.id}`}
                    sx={{
                      bgcolor: "#eef3e8",
                      borderRadius: 3,
                      width: 88,
                      height: 88,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1,
                    }}
                  >
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    )}
                  </Box>

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      component={Link}
                      to={`/products/${item.id}`}
                      variant="subtitle1"
                      sx={{ fontWeight: 700, textDecoration: "none", color: "text.primary", "&:hover": { color: "primary.main" } }}
                    >
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      ${item.price} each
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 999,
                          px: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ px: 1, fontWeight: 700 }}>
                          Qty: {item.quantity}
                        </Typography>
                        <IconButton size="small" onClick={() => addToCart(item)} aria-label={`Add one ${item.name}`}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>

                  <Stack alignItems="flex-end" spacing={1}>
                    <Typography color="primary.main" sx={{ fontWeight: 800 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Button onClick={clearCart} color="error" sx={{ mt: 2 }} startIcon={<DeleteOutlineIcon />}>
            Clear cart
          </Button>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: { md: "sticky" }, top: 88 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Order Summary
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Items</Typography>
                <Typography sx={{ fontWeight: 600 }}>{itemCount}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Shipping</Typography>
                <Typography sx={{ fontWeight: 600, color: "primary.main" }}>Free</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Total
                </Typography>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 3 }}>
              <Button variant="contained" size="large" fullWidth startIcon={<CreditCardIcon />} onClick={checkout}>
                Pay With Card
              </Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<ReceiptLongOutlinedIcon />} onClick={handleCheckout}>
                Place Order
              </Button>
              <Button component={Link} to="/orders" color="inherit" sx={{ color: "text.secondary" }}>
                View My Orders
              </Button>
            </Stack>

            <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="center" sx={{ mt: 2, color: "text.secondary" }}>
              <LockOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">Secure checkout</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>
            {toast.message}
          </Alert>
        ) : null}
      </Snackbar>
    </Container>
  )
}

export default CartPage
