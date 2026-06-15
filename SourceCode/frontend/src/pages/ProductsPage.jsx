import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import {
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"

const categories = ["ALL", "Protein", "Snacks", "Vitamins"]

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products")
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "ALL" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          bgcolor: "primary.dark",
          color: "primary.contrastText",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.85 }}>
            Eat clean, live well
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, maxWidth: 620, textWrap: "balance" }}>
            Wholesome food &amp; supplements, delivered fresh
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 560, opacity: 0.9 }}>
            Granola, protein bars, whey protein and vitamins &mdash; carefully sourced to fuel a
            healthier you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Search + filters */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Products
            </Typography>
            <Typography color="text.secondary">{filteredProducts.length} items available</Typography>
          </Box>

          <TextField
  placeholder="Search product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    width: { xs: "100%", md: 320 },
    "& .MuiOutlinedInput-root": {
      borderRadius: "999px",
      backgroundColor: "background.paper",
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon fontSize="small" />
      </InputAdornment>
    ),
  }}
/>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat === "ALL" ? "All" : cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? "primary" : "default"}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              sx={{ fontWeight: 600, px: 0.5 }}
            />
          ))}
        </Stack>

        {/* Grid */}
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton width="70%" />
                      <Skeleton width="40%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardActionArea component={Link} to={`/products/${product.id}`}>
                      <Box sx={{ bgcolor: "#f0f3ec", p: 2 }}>
                        <CardMedia
                          component="img"
                          image={product.imageUrl}
                          alt={product.name}
                          sx={{ height: 180, objectFit: "contain" }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {product.name}
                          </Typography>
                          {product.category && (
                            <Chip
                              label={product.category}
                              size="small"
                              sx={{ bgcolor: "#e8f1e4", color: "primary.dark", fontWeight: 600 }}
                            />
                          )}
                        </Stack>
                        <Typography
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{
                        px: 2,
                        pb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${product.price}
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                        <Inventory2OutlinedIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">Stock: {product.stock}</Typography>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {!loading && filteredProducts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
            <Typography variant="h6">No products match your search.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default ProductsPage
