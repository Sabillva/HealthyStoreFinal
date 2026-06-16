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
  Avatar,
} from "@mui/material"
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"

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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Orders
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Track and update the status of customer orders.
      </Typography>

      <AdminTabs />

      {orders.length === 0 && (
        <Paper
          elevation={0}
          sx={{ p: 6, textAlign: "center", color: "text.secondary", borderRadius: 4, border: "1px solid", borderColor: "divider" }}
        >
          <ReceiptLongOutlinedIcon sx={{ fontSize: 48, opacity: 0.4, mb: 1 }} />
          <Typography>No orders yet.</Typography>
        </Paper>
      )}

      <Stack spacing={2.5}>
        {orders.map((order) => (
          <Paper
            key={order.id}
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ sm: "center" }}
              spacing={2}
            >
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar variant="rounded" sx={{ bgcolor: "primary.light", color: "primary.main", borderRadius: 2 }}>
                    <ReceiptLongOutlinedIcon fontSize="small" />
                  </Avatar>
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
                <Stack direction="row" spacing={2} sx={{ mt: 1, color: "text.secondary" }} flexWrap="wrap">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonOutlineIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{order.userName}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                    <Typography variant="body2">{order.createdAt}</Typography>
                  </Stack>
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                  ${order.totalPrice}
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
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
            <Stack spacing={1}>
              {order.items.map((item) => (
                <Stack
                  key={item.productName}
                  direction="row"
                  justifyContent="space-between"
                  sx={{ bgcolor: "action.hover", borderRadius: 2, px: 2, py: 1 }}
                >
                  <Typography color="text.secondary">
                    {item.productName} &times; {item.quantity}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>${item.price}</Typography>
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
