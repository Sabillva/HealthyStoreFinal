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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined"

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Admin Products
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Add, edit and remove products in your catalog.
      </Typography>

      <AdminTabs />

      <Grid container spacing={3}>
        {/* Form */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, position: { md: "sticky" }, top: 88 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {editingId ? "Edit Product" : "Add Product"}
              </Typography>
              {editingId && <Chip label={`#${editingId}`} size="small" color="primary" />}
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
                <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
                <TextField label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} fullWidth />
              </Stack>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              />
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={editingId ? updateProduct : createProduct}
                >
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
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Product List
            </Typography>
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
                      <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
                      <TableCell>
                        {product.category ? (
                          <Chip
                            label={product.category}
                            size="small"
                            sx={{ bgcolor: "#e8f1e4", color: "primary.dark", fontWeight: 600 }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "primary.main", fontWeight: 600 }}>
                        ${product.price}
                      </TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Button
                            size="small"
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => {
                              setEditingId(product.id)
                              setName(product.name)
                              setDescription(product.description)
                              setPrice(product.price)
                              setStock(product.stock)
                              setImageUrl(product.imageUrl)
                              setCategory(product.category)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
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
