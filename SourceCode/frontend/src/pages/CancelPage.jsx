import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <HighlightOffRoundedIcon sx={{ fontSize: 56, color: 'error.main' }} />
          </Box>

          <Typography variant="h4" fontWeight={800} gutterBottom>
            Payment Cancelled
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 380, mx: 'auto' }}>
            No worries — your order was not completed and you have not been charged. Your items are
            still waiting for you in the cart.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<StorefrontOutlinedIcon />}
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
