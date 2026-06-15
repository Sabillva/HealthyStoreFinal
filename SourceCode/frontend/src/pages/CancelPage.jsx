import { Link } from "react-router-dom"
import { Container, Paper, Typography, Button, Box } from "@mui/material"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

function CancelPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper sx={{ p: 6, textAlign: "center" }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#fdeceb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <HighlightOffIcon color="error" sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Payment Cancelled
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
          You cancelled the payment. Your cart is still saved.
        </Typography>
        <Button component={Link} to="/cart" variant="contained" size="large">
          Back to Cart
        </Button>
      </Paper>
    </Container>
  )
}

export default CancelPage
