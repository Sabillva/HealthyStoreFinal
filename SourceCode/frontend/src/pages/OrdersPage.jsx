import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import { auth } from "../firebase/firebase"
import {
  Container,
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"

const statusColor = (status = "") => {
  const s = status.toLowerCase()
  if (s.includes("complete") || s.includes("paid") || s.includes("deliver")) return "success"
  if (s.includes("cancel") || s.includes("fail")) return "error"
  if (s.includes("pending") || s.includes("process")) return "warning"
  return "default"
}

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const userName = auth.currentUser?.email
      const response = await api.get(`/api/orders/history/${encodeURIComponent(userName)}`)
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        My Orders
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {orders.length} order{orders.length === 1 ? "" : "s"} placed
      </Typography>

      {orders.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 8, textAlign: "center", color: "text.secondary" }}>
          <ReceiptLongOutlinedIcon sx={{ fontSize: 56, opacity: 0.4 }} />
          <Typography variant="h6" sx={{ mt: 1, color: "text.primary" }}>
            No orders yet
          </Typography>
          <Typography sx={{ mb: 3 }}>Your placed orders will appear here.</Typography>
          <Button component={Link} to="/products" variant="contained">
            Browse products
          </Button>
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          {orders.map((order) => (
            <Paper key={order.id} variant="outlined" sx={{ overflow: "hidden" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ sm: "center" }}
                spacing={1}
                sx={{ p: 2.5, bgcolor: "#f6f9f3" }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ReceiptLongOutlinedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>Order #{order.id}</Typography>
                    {order.createdAt && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "text.secondary" }}>
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 13 }} />
                        <Typography variant="caption">
                          {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  {order.status && (
                    <Chip label={order.status} color={statusColor(order.status)} size="small" sx={{ fontWeight: 700 }} />
                  )}
                  {order.totalPrice != null && (
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                      ${Number(order.totalPrice).toFixed(2)}
                    </Typography>
                  )}
                </Stack>
              </Stack>

              {Array.isArray(order.items) && order.items.length > 0 && (
                <Box sx={{ p: 2.5 }}>
                  <Stack spacing={1}>
                    {order.items.map((item, idx) => (
                      <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">
                          {item.productName || item.name || `Product #${item.productId}`}
                          <Box component="span" sx={{ color: "text.secondary" }}>
                            {" "}
                            &times; {item.quantity}
                          </Box>
                        </Typography>
                        {item.price != null && (
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </Typography>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  )
}

export default OrdersPage
