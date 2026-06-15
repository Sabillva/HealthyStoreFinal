import { Link as RouterLink, useLocation } from "react-router-dom"
import { Tabs, Tab, Box } from "@mui/material"

const tabs = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
]

function AdminTabs() {
  const location = useLocation()
  const current = tabs.findIndex((t) => t.to === location.pathname)

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
      <Tabs value={current === -1 ? 0 : current}>
        {tabs.map((t) => (
          <Tab key={t.to} component={RouterLink} to={t.to} label={t.label} sx={{ fontWeight: 600 }} />
        ))}
      </Tabs>
    </Box>
  )
}

export default AdminTabs
