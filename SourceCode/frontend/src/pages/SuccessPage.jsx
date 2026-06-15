import { Link } from "react-router-dom"
import { Container, Paper, Typography, Button, Box } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined"

function SuccessPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper sx={{ p: 6, textAlign: "center" }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#e8f1e4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Payment Successful
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
          Thank you for your order. We&apos;re getting it ready for you.
        </Typography>
        <Button component={Link} to="/orders" variant="contained" size="large" sx={{ mr: 1 }}>
          View My Orders
        </Button>
        <Button component={Link} to="/" variant="outlined" size="large">
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  )
}

export default SuccessPage
