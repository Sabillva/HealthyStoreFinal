import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

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
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 56, color: 'success.main' }} />
          </Box>

          <Typography variant="h4" fontWeight={800} gutterBottom>
            Payment Successful
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 380, mx: 'auto' }}>
            Thank you for your order! Your healthy goods are on their way. You can track your
            purchase anytime from the My Orders page.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={() => navigate('/orders')}
            >
              View My Orders
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
