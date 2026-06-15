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
  Divider,
  IconButton,
  Chip,
} from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined"

function AdminPage() {
  const [products, setProducts] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    fetchProducts()
    fetchQuestions()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products")
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/api/questions")
      setQuestions(response.data)
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

  const createProduct = async () => {
    try {
      await api.post("/api/products", {
        name,
        description,
        imageUrl,
        price: Number(price),
        stock: Number(stock),
      })

      setName("")
      setDescription("")
      setImageUrl("")
      setPrice("")
      setStock("")

      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const answerQuestion = async (questionId) => {
    try {
      await api.put(`/api/questions/${questionId}/answer`, {
        answer: answers[questionId],
      })
      fetchQuestions()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Admin Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage your catalog and answer customer questions.
      </Typography>

      <AdminTabs />

      <Grid container spacing={3}>
        {/* Create product */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <AddCircleOutlineIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Create Product
              </Typography>
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
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  fullWidth
                />
              </Stack>
              <Button variant="contained" onClick={createProduct} size="large">
                Create Product
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Products list */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Products
            </Typography>
            <Stack spacing={1.5}>
              {products.map((product) => (
                <Box key={product.id}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                        ${product.price}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => deleteProduct(product.id)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ mt: 1.5 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Questions */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Customer Questions
            </Typography>
            <Stack spacing={2}>
              {questions.map((question) => (
                <Paper key={question.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                  <Typography sx={{ fontWeight: 600 }}>{question.userName}</Typography>
                  <Typography sx={{ mt: 0.5 }}>
                    <Box component="span" sx={{ fontWeight: 600, color: "primary.main" }}>
                      Q:
                    </Box>{" "}
                    {question.question}
                  </Typography>

                  {question.answer ? (
                    <Typography sx={{ mt: 1, color: "text.secondary" }}>
                      <Box component="span" sx={{ fontWeight: 600, color: "secondary.main" }}>
                        A:
                      </Box>{" "}
                      {question.answer}
                    </Typography>
                  ) : (
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1.5 }}>
                      <TextField
                        placeholder="Write answer..."
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          setAnswers({ ...answers, [question.id]: e.target.value })
                        }
                        fullWidth
                      />
                      <Button variant="contained" onClick={() => answerQuestion(question.id)}>
                        Answer
                      </Button>
                    </Stack>
                  )}
                </Paper>
              ))}
              {questions.length === 0 && (
                <Chip label="No questions yet" sx={{ alignSelf: "flex-start" }} />
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminPage
