import { useEffect, useState } from "react"
import api from "../services/api"
import AdminTabs from "../components/AdminTabs"
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Tooltip,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products")
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setName("")
    setDescription("")
    setPrice("")
    setStock("")
    setImageUrl("")
    setCategory("")
  }

  const createProduct = async () => {
    try {
      await api.post("/api/products", {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        category,
      })
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const updateProduct = async () => {
    try {
      await api.put(`/api/products/${editingId}`, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        category,
      })
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const startEdit = (product) => {
    setEditingId(product.id)
    setName(product.name || "")
    setDescription(product.description || "")
    setPrice(product.price ?? "")
    setStock(product.stock ?? "")
    setImageUrl(product.imageUrl || "")
    setCategory(product.category || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Products
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add, edit and remove products in your catalog. Categories are managed here.
      </Typography>

      <AdminTabs />

      <Grid container spacing={3}>
        {/* Form */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider", position: { md: "sticky" }, top: 88 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
              <Avatar variant="rounded" sx={{ bgcolor: "primary.light", color: "primary.main", borderRadius: 2.5 }}>
                {editingId ? <EditOutlinedIcon /> : <AddCircleOutlineIcon />}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  {editingId ? "Edit Product" : "Add Product"}
                </Typography>
                {editingId && (
                  <Typography variant="body2" color="text.secondary">
                    Editing #{editingId}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack spacing={2}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={2}
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <TextField label="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
                <TextField label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} fullWidth />
              </Stack>
              <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Protein, Snacks, Supplements"
                fullWidth
              />
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" size="large" onClick={editingId ? updateProduct : createProduct} fullWidth>
                  {editingId ? "Update Product" : "Create Product"}
                </Button>
                {editingId && (
                  <Button variant="outlined" size="large" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* List */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Product List
              </Typography>
              <Chip label={`${products.length} items`} size="small" sx={{ fontWeight: 700 }} />
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Stock
                    </TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            variant="rounded"
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "action.hover" }}
                          >
                            <Inventory2OutlinedIcon fontSize="small" color="disabled" />
                          </Avatar>
                          <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {product.category ? (
                          <Chip label={product.category} size="small" variant="outlined" color="primary" />
                        ) : (
                          <Typography variant="body2" color="text.disabled">
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "primary.main" }}>
                        ${product.price}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={product.stock}
                          size="small"
                          color={Number(product.stock) > 0 ? "success" : "error"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary" onClick={() => startEdit(product)}>
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteProduct(product.id)}
                            aria-label={`Delete ${product.name}`}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5, color: "text.secondary" }}>
                        No products yet. Add your first product on the left.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminProductsPage
