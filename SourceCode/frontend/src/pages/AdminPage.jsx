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
  Divider,
} from "@mui/material"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined"

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        variant="rounded"
        sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 56, height: 56, borderRadius: 3 }}
      >
        <Icon />
      </Avatar>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  )
}

function AdminPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    fetchProducts()
    fetchOrders()
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

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/orders")
      setOrders(response.data)
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

  const revenue = orders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0)
  const pendingQuestions = questions.filter((q) => !q.answer)

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Admin Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Overview of your store performance and customer questions.
      </Typography>

      <AdminTabs />

      {/* Stat cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={Inventory2OutlinedIcon} label="Products" value={products.length} color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={ReceiptLongOutlinedIcon} label="Orders" value={orders.length} color="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={PaymentsOutlinedIcon} label="Revenue" value={`$${revenue.toFixed(2)}`} color="success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={HelpOutlineOutlinedIcon}
            label="Pending Q&A"
            value={pendingQuestions.length}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Customer Questions */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
          <QuestionAnswerOutlinedIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Customer Questions
          </Typography>
          {pendingQuestions.length > 0 && (
            <Chip
              label={`${pendingQuestions.length} unanswered`}
              size="small"
              color="warning"
              sx={{ fontWeight: 700 }}
            />
          )}
        </Stack>

        <Stack spacing={2}>
          {questions.map((question) => (
            <Paper
              key={question.id}
              variant="outlined"
              sx={{ p: 2.5, borderRadius: 3, borderColor: question.answer ? "divider" : "warning.light" }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.light", color: "primary.main" }}>
                  <PersonOutlineIcon fontSize="small" />
                </Avatar>
                <Typography sx={{ fontWeight: 700 }}>{question.userName}</Typography>
                {!question.answer && <Chip label="Pending" size="small" color="warning" variant="outlined" />}
              </Stack>

              <Typography sx={{ mb: question.answer ? 1 : 1.5 }}>
                <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Q:
                </Box>{" "}
                {question.question}
              </Typography>

              {question.answer ? (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography sx={{ color: "text.secondary" }}>
                    <Box component="span" sx={{ fontWeight: 700, color: "secondary.main" }}>
                      A:
                    </Box>{" "}
                    {question.answer}
                  </Typography>
                </>
              ) : (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <TextField
                    size="small"
                    placeholder="Write your answer..."
                    value={answers[question.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    fullWidth
                  />
                  <Button variant="contained" onClick={() => answerQuestion(question.id)} sx={{ flexShrink: 0 }}>
                    Answer
                  </Button>
                </Stack>
              )}
            </Paper>
          ))}

          {questions.length === 0 && (
            <Box sx={{ textAlign: "center", py: 5, color: "text.secondary" }}>
              <QuestionAnswerOutlinedIcon sx={{ fontSize: 44, opacity: 0.4, mb: 1 }} />
              <Typography>No customer questions yet.</Typography>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}

export default AdminPage
