import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { Container, Paper, Typography, TextField, Button, Stack, Box } from "@mui/material"
import SpaIcon from "@mui/icons-material/Spa"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const token = await userCredential.user.getIdToken(true)
      console.log(token)

      alert("Login successful")

      // 🔥 BURASI VACİBDİR
      navigate("/products")

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SpaIcon />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Welcome back
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Sign in to your Healthy Store account
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Don&apos;t have an account?{" "}
          <Box component={Link} to="/register" sx={{ color: "primary.main", fontWeight: 600 }}>
            Register
          </Box>
        </Typography>
      </Paper>
    </Container>
  )
}

export default LoginPage