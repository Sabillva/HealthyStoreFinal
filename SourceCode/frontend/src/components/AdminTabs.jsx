import { Link as RouterLink, useLocation } from "react-router-dom"
import { Box, Paper, Stack, Typography } from "@mui/material"
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboardOutlined"
import Inventory2Icon from "@mui/icons-material/Inventory2Outlined"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongOutlined"

const tabs = [
  { label: "Dashboard", to: "/admin", icon: SpaceDashboardIcon },
  { label: "Products", to: "/admin/products", icon: Inventory2Icon },
  { label: "Orders", to: "/admin/orders", icon: ReceiptLongIcon },
]

function AdminTabs() {
  const location = useLocation()

  return (
    <Paper variant="outlined" sx={{ p: 1, mb: 4, borderRadius: 999, display: "inline-flex", maxWidth: "100%", overflowX: "auto" }}>
      <Stack direction="row" spacing={0.5}>
        {tabs.map((t) => {
          const active = location.pathname === t.to
          const Icon = t.icon
          return (
            <Box
              key={t.to}
              component={RouterLink}
              to={t.to}
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 1.1,
                borderRadius: 999,
                whiteSpace: "nowrap",
                color: active ? "primary.contrastText" : "text.secondary",
                bgcolor: active ? "primary.main" : "transparent",
                transition: "all .2s",
                "&:hover": { bgcolor: active ? "primary.dark" : "rgba(46,125,50,0.08)" },
              }}
            >
              <Icon fontSize="small" />
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{t.label}</Typography>
            </Box>
          )
        })}
      </Stack>
    </Paper>
  )
}

export default AdminTabs
