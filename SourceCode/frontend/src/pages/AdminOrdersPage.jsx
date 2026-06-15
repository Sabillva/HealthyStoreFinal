import { useEffect, useState } from "react"
import api from "../services/api"
import AdminTabs from "../components/AdminTabs"
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined"

const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"]

const statusColor = {
  PENDING: "warning",
  CONFIRMED: "info",
  SHIPPED: "primary",
  DELIVERED: "success",
}

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/orders")
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/api/orders/${orderId}/status`, { status })
      fetchOrders()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Admin Orders
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Track and update the status of customer orders.
      </Typography>

      <AdminTabs />

      {orders.length === 0 && (
        <Paper sx={{ p: 6, textAlign: "center", color: "text.secondary" }}>No orders yet</Paper>
      )}

      <Stack spacing={2.5}>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ sm: "center" }}
              spacing={2}
            >
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Order #{order.id}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={statusColor[order.status] || "default"}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 0.5, color: "text.secondary" }}>
                  <PersonOutlineIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{order.userName}</Typography>
                  <Typography variant="body2">&middot; {order.createdAt}</Typography>
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                  ${order.totalPrice}
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Items
            </Typography>
            <Stack spacing={0.75}>
              {order.items.map((item) => (
                <Stack key={item.productName} direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">
                    {item.productName} &times; {item.quantity}
                  </Typography>
                  <Typography>${item.price}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  )
}

export default AdminOrdersPage
