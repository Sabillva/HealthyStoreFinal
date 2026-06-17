import { useContext, useState } from "react"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Container,
  Typography,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import EcoIcon from "@mui/icons-material/Spa"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined"
import LogoutIcon from "@mui/icons-material/LogoutOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import { CartContext } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const { user, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { label: "Shop", to: "/products" },
    { label: "My Orders", to: "/orders" },
    ...(isAdmin ? [{ label: "Admin", to: "/admin" }] : []),
  ]

  const isActive = (to) =>
    to === "/admin" ? location.pathname.startsWith("/admin") : location.pathname === to

  const handleLogout = async () => {
    setAnchorEl(null)
    await logout()
    navigate("/login", { replace: true })
  }

  const initial = user?.email?.[0]?.toUpperCase() || "U"

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: 68 }}>
          {isMobile && user && (
            <IconButton edge="start" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </IconButton>
          )}

          <Box
            component={RouterLink}
            to="/products"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              color: "primary.main",
              mr: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: 40,
                height: 40,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(46,125,50,0.3)",
              }}
            >
              <EcoIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em" }}>
              Healthy
              <Box component="span" sx={{ color: "primary.main" }}>
                Store
              </Box>
            </Typography>
          </Box>

          {/* Desktop nav links */}
          <Box sx={{ flexGrow: 1, display: "flex", gap: 0.5, ml: 1 }}>
            {!isMobile &&
              navLinks.map((link) => {
                const active = isActive(link.to)
                return (
                  <Button
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    startIcon={link.label === "Admin" ? <AdminPanelSettingsIcon /> : undefined}
                    sx={{
                      color: active ? "primary.main" : "text.secondary",
                      bgcolor: active ? "rgba(46,125,50,0.1)" : "transparent",
                      fontWeight: active ? 700 : 600,
                      px: 2,
                      "&:hover": { bgcolor: "rgba(46,125,50,0.08)" },
                    }}
                  >
                    {link.label}
                  </Button>
                )
              })}
          </Box>

          {!isMobile && <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />}

          <IconButton component={RouterLink} to="/cart" color="primary" aria-label="View cart">
            <Badge badgeContent={count} color="secondary" overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user && (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 0.5 }} aria-label="Account menu">
                <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 16, fontWeight: 700 }}>
                  {initial}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{ paper: { sx: { mt: 1, minWidth: 220, borderRadius: 3 } } }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Signed in as
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: "break-all" }}>
                    {user.email}
                  </Typography>
                  {isAdmin && (
                    <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                      Administrator
                    </Typography>
                  )}
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <Typography color="error" sx={{ fontWeight: 600 }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <Box sx={{ px: 2, pb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: 36,
                height: 36,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EcoIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              HealthyStore
            </Typography>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                selected={isActive(link.to)}
              >
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600, color: "error.main" }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar
