import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../services/api"
import { CartContext } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
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
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined"
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import VerifiedIcon from "@mui/icons-material/VerifiedOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"

function ProductDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [questions, setQuestions] = useState([])
  const [reviewUserName, setReviewUserName] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [questionUserName, setQuestionUserName] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [toast, setToast] = useState(false)
  const [tab, setTab] = useState(0)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetchProduct()
    fetchReviews()
    fetchQuestions()
  }, [id])

  useEffect(() => {
    if (user?.email) {
      setReviewUserName((prev) => prev || user.email)
      setQuestionUserName((prev) => prev || user.email)
    }
  }, [user])

  const submitReview = async () => {
    try {
      await api.post(`/api/products/${id}/reviews`, {
        userName: reviewUserName,
        rating: reviewRating,
        comment: reviewComment,
      })
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

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const c = reviews.filter((r) => Math.round(r.rating) === star).length
    return { star, count: c, pct: reviews.length ? (c / reviews.length) * 100 : 0 }
  })

  const outOfStock = Number(product.stock) <= 0

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/products"
        startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
        sx={{ mb: 2, color: "text.secondary" }}
      >
        Back to shop
      </Button>

      <Grid container spacing={4}>
        {/* Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              bgcolor: "#eef3e8",
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 380,
              position: "relative",
            }}
          >
            {product.category && (
              <Chip
                label={product.category}
                sx={{ position: "absolute", top: 16, left: 16, bgcolor: "rgba(255,255,255,0.9)", color: "primary.dark", fontWeight: 700 }}
              />
            )}
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{ maxWidth: "100%", maxHeight: 360, objectFit: "contain" }}
            />
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
            <Rating value={avgRating} precision={0.5} readOnly size="small" />
            <Typography color="text.secondary" variant="body2">
              {reviews.length ? `${avgRating.toFixed(1)} (${reviews.length} reviews)` : "No reviews yet"}
            </Typography>
          </Stack>

          <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.7 }}>
            {product.description}
          </Typography>

          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 3 }}>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 800 }}>
              ${product.price}
            </Typography>
          </Stack>

          <Chip
            icon={<Inventory2OutlinedIcon />}
            label={outOfStock ? "Out of stock" : `${product.stock} in stock`}
            color={outOfStock ? "error" : "success"}
            variant="outlined"
            sx={{ mt: 1.5, fontWeight: 700 }}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              disabled={outOfStock}
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

          {/* Trust badges */}
          <Stack direction="row" spacing={3} sx={{ mt: 4, flexWrap: "wrap", gap: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <VerifiedIcon color="primary" fontSize="small" />
              <Typography variant="body2">Quality guaranteed</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <LocalShippingOutlinedIcon color="primary" fontSize="small" />
              <Typography variant="body2">Free shipping</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Tabs: Reviews & Q/A */}
      <Paper variant="outlined" sx={{ mt: 6, overflow: "hidden" }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ px: 2, borderBottom: 1, borderColor: "divider", "& .MuiTab-root": { fontWeight: 700, py: 2 } }}
        >
          <Tab icon={<RateReviewOutlinedIcon fontSize="small" />} iconPosition="start" label={`Reviews (${reviews.length})`} />
          <Tab icon={<QuestionAnswerOutlinedIcon fontSize="small" />} iconPosition="start" label={`Q&A (${questions.length})`} />
        </Tabs>

        {/* REVIEWS */}
        {tab === 0 && (
          <Box sx={{ p: { xs: 2.5, md: 4 } }}>
            <Grid container spacing={4}>
              {/* Summary + form */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Paper variant="outlined" sx={{ p: 3, mb: 3, textAlign: "center", bgcolor: "#f6f9f3" }}>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: "primary.main", lineHeight: 1 }}>
                    {avgRating.toFixed(1)}
                  </Typography>
                  <Rating value={avgRating} precision={0.5} readOnly sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
                  </Typography>

                  <Stack spacing={0.75} sx={{ mt: 2, textAlign: "left" }}>
                    {distribution.map((d) => (
                      <Stack key={d.star} direction="row" spacing={1} alignItems="center">
                        <Stack direction="row" spacing={0.25} alignItems="center" sx={{ width: 34 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {d.star}
                          </Typography>
                          <StarRoundedIcon sx={{ fontSize: 14, color: "secondary.main" }} />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={d.pct}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 999, bgcolor: "rgba(0,0,0,0.06)" }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ width: 22, textAlign: "right" }}>
                          {d.count}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
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
                        size="large"
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
                    <Button
                      variant="contained"
                      onClick={submitReview}
                      disabled={!reviewUserName || !reviewComment}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Submit Review
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              {/* Reviews list */}
              <Grid size={{ xs: 12, md: 7 }}>
                {reviews.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 6, textAlign: "center", color: "text.secondary" }}>
                    <RateReviewOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                    <Typography sx={{ mt: 1 }}>No reviews yet. Be the first to share your thoughts!</Typography>
                  </Paper>
                ) : (
                  <Stack spacing={2}>
                    {reviews.map((review) => (
                      <Paper key={review.id} variant="outlined" sx={{ p: 2.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ bgcolor: "primary.main", fontWeight: 700 }}>
                              {review.userName?.[0]?.toUpperCase() || "?"}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 700 }}>{review.userName}</Typography>
                              <Rating value={review.rating} readOnly size="small" />
                            </Box>
                          </Stack>
                        </Stack>
                        <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.6 }}>
                          {review.comment}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {/* QUESTIONS */}
        {tab === 1 && (
          <Box sx={{ p: { xs: 2.5, md: 4 } }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
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
                    <Button
                      variant="contained"
                      onClick={submitQuestion}
                      disabled={!questionUserName || !questionText}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Ask Question
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                {questions.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 6, textAlign: "center", color: "text.secondary" }}>
                    <QuestionAnswerOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                    <Typography sx={{ mt: 1 }}>No questions yet. Ask the first one!</Typography>
                  </Paper>
                ) : (
                  <Stack spacing={2}>
                    {questions.map((question) => (
                      <Paper key={question.id} variant="outlined" sx={{ p: 2.5 }}>
                        <Stack direction="row" spacing={1.5}>
                          <Avatar sx={{ bgcolor: "rgba(46,125,50,0.12)", color: "primary.main", fontWeight: 700, width: 36, height: 36 }}>
                            {question.userName?.[0]?.toUpperCase() || "?"}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{question.userName}</Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                              <Chip label="Q" size="small" color="primary" sx={{ height: 22, fontWeight: 800 }} />
                              <Typography>{question.question}</Typography>
                            </Stack>

                            {question.answer ? (
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mt: 1.5, p: 1.5, bgcolor: "#f6f9f3", borderRadius: 2 }}
                              >
                                <Chip label="A" size="small" color="secondary" sx={{ height: 22, fontWeight: 800 }} />
                                <Typography sx={{ color: "text.secondary" }}>{question.answer}</Typography>
                              </Stack>
                            ) : (
                              <Chip label="Waiting for answer..." size="small" variant="outlined" sx={{ mt: 1.5 }} />
                            )}
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

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
