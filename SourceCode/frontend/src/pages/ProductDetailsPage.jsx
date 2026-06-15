import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../services/api"
import { CartContext } from "../context/CartContext"
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Rating,
  TextField,
  Stack,
  Divider,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined"

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [questions, setQuestions] = useState([])
  const [reviewUserName, setReviewUserName] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [questionUserName, setQuestionUserName] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [toast, setToast] = useState(false)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetchProduct()
    fetchReviews()
    fetchQuestions()
  }, [id])

  const submitReview = async () => {
    try {
      await api.post(`/api/products/${id}/reviews`, {
        userName: reviewUserName,
        rating: reviewRating,
        comment: reviewComment,
      })
      setReviewUserName("")
      setReviewRating(5)
      setReviewComment("")
      fetchReviews()
    } catch (error) {
      console.error(error)
    }
  }

  const submitQuestion = async () => {
    try {
      await api.post(`/api/products/${id}/questions`, {
        userName: questionUserName,
        question: questionText,
      })
      setQuestionUserName("")
      setQuestionText("")
      fetchQuestions()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/api/products/${id}/reviews`)
      setReviews(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await api.get(`/api/products/${id}/questions`)
      setQuestions(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={Link} to="/" color="inherit" sx={{ mb: 2, color: "text.secondary" }}>
        &larr; Back to shop
      </Button>

      <Grid container spacing={4}>
        {/* Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ bgcolor: "#f0f3ec", p: 4, display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain" }}
            />
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          {product.category && (
            <Chip
              label={product.category}
              size="small"
              sx={{ bgcolor: "#e8f1e4", color: "primary.dark", fontWeight: 600, mb: 1.5 }}
            />
          )}
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
            <Rating value={avgRating} precision={0.5} readOnly size="small" />
            <Typography color="text.secondary" variant="body2">
              {reviews.length ? `${avgRating.toFixed(1)} (${reviews.length} reviews)` : "No reviews yet"}
            </Typography>
          </Stack>

          <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.6 }}>
            {product.description}
          </Typography>

          <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700, mt: 3 }}>
            ${product.price}
          </Typography>

          <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 1, color: "text.secondary" }}>
            <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{product.stock} in stock</Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                addToCart(product)
                setToast(true)
              }}
            >
              Add to Cart
            </Button>
            <Button component={Link} to="/cart" variant="outlined" size="large">
              Go to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Reviews */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Reviews
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Write a review
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Your Name"
                  value={reviewUserName}
                  onChange={(e) => setReviewUserName(e.target.value)}
                  fullWidth
                />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Rating
                  </Typography>
                  <Rating
                    value={reviewRating}
                    onChange={(e, value) => setReviewRating(Number(value))}
                  />
                </Box>
                <TextField
                  label="Your Review"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <Button variant="contained" onClick={submitReview} sx={{ alignSelf: "flex-start" }}>
                  Submit Review
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            {reviews.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                No reviews yet. Be the first to share your thoughts!
              </Paper>
            )}
            <Stack spacing={2}>
              {reviews.map((review) => (
                <Paper key={review.id} sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.light" }}>
                      {review.userName?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{review.userName}</Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Stack>
                  <Typography sx={{ mt: 1.5, color: "text.secondary" }}>{review.comment}</Typography>
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Questions & Answers */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <QuestionAnswerOutlinedIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Questions &amp; Answers
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Ask a question
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Your Name"
                  value={questionUserName}
                  onChange={(e) => setQuestionUserName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Ask a question..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  multiline
                  minRows={2}
                  fullWidth
                />
                <Button variant="contained" onClick={submitQuestion} sx={{ alignSelf: "flex-start" }}>
                  Ask Question
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            {questions.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                No questions yet.
              </Paper>
            )}
            <Stack spacing={2}>
              {questions.map((question) => (
                <Paper key={question.id} sx={{ p: 2.5 }}>
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
                    <Chip label="Waiting for answer..." size="small" sx={{ mt: 1 }} />
                  )}
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={toast}
        autoHideDuration={2500}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToast(false)}>
          Added to cart
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ProductDetailsPage
