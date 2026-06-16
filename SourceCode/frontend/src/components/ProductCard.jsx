import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import { CartContext } from "../context/CartContext"

function ProductCard({ product, onAdded }) {
  const { addToCart } = useContext(CartContext)
  const [hover, setHover] = useState(false)

  const outOfStock = Number(product.stock) <= 0

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s, box-shadow .2s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 16px 32px rgba(27,42,31,0.12)" : "0 4px 18px rgba(27,42,31,0.05)",
      }}
    >
      {/* Image */}
      <Box
        component={Link}
        to={`/products/${product.id}`}
        sx={{
          position: "relative",
          display: "block",
          bgcolor: "#eef3e8",
          p: 2,
          textDecoration: "none",
        }}
      >
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(255,255,255,0.92)",
              color: "primary.dark",
              fontWeight: 700,
              fontSize: 11,
            }}
          />
        )}
        {outOfStock && (
          <Chip
            label="Out of stock"
            size="small"
            color="error"
            sx={{ position: "absolute", top: 10, right: 10, fontWeight: 700, fontSize: 11 }}
          />
        )}
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.name}
          sx={{
            display: "block",
            width: "100%",
            height: 150,
            objectFit: "contain",
            transition: "transform .25s",
            transform: hover ? "scale(1.05)" : "none",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
        <Typography
          component={Link}
          to={`/products/${product.id}`}
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            textDecoration: "none",
            color: "text.primary",
            display: "block",
            "&:hover": { color: "primary.main" },
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      {/* Footer */}
      <Box sx={{ px: 2, pb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800, lineHeight: 1 }}>
            ${product.price}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {outOfStock ? "Unavailable" : `${product.stock} in stock`}
          </Typography>
        </Box>

        <Tooltip title="View details">
          <IconButton component={Link} to={`/products/${product.id}`} size="small" color="primary" aria-label={`View ${product.name}`}>
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          size="small"
          disabled={outOfStock}
          onClick={() => {
            addToCart(product)
            onAdded?.(product)
          }}
          sx={{ minWidth: 0, px: 1.5 }}
          aria-label={`Add ${product.name} to cart`}
        >
          <AddShoppingCartIcon fontSize="small" />
        </Button>
      </Box>
    </Card>
  )
}

export default ProductCard
