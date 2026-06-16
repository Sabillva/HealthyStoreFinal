import { useEffect, useState } from "react"
import api from "../services/api"
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import SpaIcon from "@mui/icons-material/Spa"
import ProductCard from "../components/ProductCard"

const categories = ["ALL", "Protein", "Snacks", "Vitamins"]

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState("")

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
          position: "relative",
          color: "primary.contrastText",
          py: { xs: 6, md: 9 },
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(135deg, #1b5e20 0%, #2e7d32 55%, #3a8a3e 100%)",
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Chip
            icon={<SpaIcon sx={{ color: "inherit !important" }} />}
            label="Eat clean, live well"
            sx={{
              bgcolor: "rgba(255,255,255,0.16)",
              color: "primary.contrastText",
              fontWeight: 700,
              letterSpacing: 0.5,
              mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ fontWeight: 800, maxWidth: 660, lineHeight: 1.1, textWrap: "balance" }}>
            Wholesome food &amp; supplements, delivered fresh
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 560, opacity: 0.9, fontSize: 17 }}>
            Granola, protein bars, whey protein and vitamins &mdash; carefully sourced to fuel a healthier you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Header + Search */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Our Products
            </Typography>
            <Typography color="text.secondary">{filteredProducts.length} items available</Typography>
          </Box>

          <TextField
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: "100%", md: 340 },
              "& .MuiOutlinedInput-root": { borderRadius: "999px", backgroundColor: "background.paper" },
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

        {/* Category filters */}
        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat === "ALL" ? "All" : cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? "primary" : "default"}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              sx={{ fontWeight: 700, px: 0.5 }}
            />
          ))}
        </Stack>

        {/* Grid */}
        <Grid container spacing={2.5}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Card>
                    <Skeleton variant="rectangular" height={150} />
                    <CardContent>
                      <Skeleton width="70%" />
                      <Skeleton width="40%" />
                      <Skeleton width="50%" sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <ProductCard product={product} onAdded={(p) => setToast(`${p.name} added to cart`)} />
                </Grid>
              ))}
        </Grid>

        {!loading && filteredProducts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
            <Typography variant="h6">No products match your search.</Typography>
          </Box>
        )}
      </Container>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2200}
        onClose={() => setToast("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToast("")}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProductsPage
