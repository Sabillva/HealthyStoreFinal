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

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext)
  const [toast, setToast] = useState(null)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

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
        <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Browse our products and add something healthy.
        </Typography>
        <Button component={Link} to="/" variant="contained" size="large">
          Start shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Paper key={item.id} sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: "#f0f3ec",
                      borderRadius: 2,
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography color="primary.main" sx={{ fontWeight: 700, mt: 0.5 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: { md: "sticky" }, top: 88 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Order Summary
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Items</Typography>
                <Typography>{cartItems.reduce((s, i) => s + i.quantity, 0)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>Free</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CreditCardIcon />}
                onClick={checkout}
              >
                Pay With Card
              </Button>
              <Button variant="outlined" size="large" fullWidth onClick={handleCheckout}>
                Place Order
              </Button>
              <Button component={Link} to="/orders" color="inherit" sx={{ color: "text.secondary" }}>
                My Orders
              </Button>
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
