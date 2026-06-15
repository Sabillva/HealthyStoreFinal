import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  Container,
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"

const statusColor = {
  PENDING: "warning",
  CONFIRMED: "info",
  SHIPPED: "primary",
  DELIVERED: "success",
}

function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrders(user.email)
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchOrders = async (email) => {
    try {
      const response = await api.get(`/api/orders/history/${email}`)
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My Orders
      </Typography>

      {orders.length === 0 && (
        <Paper sx={{ p: 6, textAlign: "center", color: "text.secondary" }}>
          <ReceiptLongOutlinedIcon sx={{ fontSize: 56, opacity: 0.5 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            No orders found
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
            Start shopping
          </Button>
        </Paper>
      )}

      <Stack spacing={2.5}>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.createdAt}
                </Typography>
              </Box>
              <Chip
                label={order.status}
                color={statusColor[order.status] || "default"}
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack spacing={1}>
              {order.items.map((item) => (
                <Stack key={item.productName} direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">
                    {item.productName} &times; {item.quantity}
                  </Typography>
                  <Typography>${item.price}</Typography>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                ${order.totalPrice ?? 0}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  )
}

export default OrdersPage
