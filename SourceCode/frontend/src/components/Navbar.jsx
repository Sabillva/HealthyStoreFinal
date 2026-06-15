import { useContext } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
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
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import EcoIcon from "@mui/icons-material/Spa"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined"
import { CartContext } from "../context/CartContext"

const navLinks = [
  { label: "Shop", to: "/" },
  { label: "My Orders", to: "/orders" },
  { label: "Admin", to: "/admin" },
]

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "primary.main",
              mr: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EcoIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              Healthy<Box component="span" sx={{ color: "primary.main" }}>Store</Box>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 0.5, ml: 1 }}>
            {!isMobile &&
              navLinks.map((link) => {
                const active = location.pathname === link.to
                return (
                  <Button
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    color={active ? "primary" : "inherit"}
                    sx={{
                      color: active ? "primary.main" : "text.secondary",
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    {link.label}
                  </Button>
                )
              })}
          </Box>

          <IconButton component={RouterLink} to="/cart" color="primary" aria-label="View cart">
            <Badge badgeContent={count} color="secondary" overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
