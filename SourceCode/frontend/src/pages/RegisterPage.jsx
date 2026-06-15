import { useState } from "react"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { Container, Paper, Typography, TextField, Button, Stack, Box } from "@mui/material"
import SpaIcon from "@mui/icons-material/Spa"

function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert("Registration successful")
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
            Create your account
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Join Healthy Store and shop clean
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
          <Button variant="contained" size="large" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 600 }}>
            Login
          </Box>
        </Typography>
      </Paper>
    </Container>
  )
}

export default RegisterPage
