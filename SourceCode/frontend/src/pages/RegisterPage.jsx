import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Collapse,
} from "@mui/material"
import SpaIcon from "@mui/icons-material/Spa"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import AuthBranding from "../components/AuthBranding"

function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e?.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await signOut(auth)
      setSuccess(true)
      setTimeout(() => navigate("/login"), 1200)
    } catch (error) {
      setError(error.message.replace("Firebase:", "").trim())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "background.default" }}>
      <AuthBranding />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2.5, sm: 4 },
        }}
      >
        <Paper
          component="form"
          onSubmit={handleRegister}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 5 },
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack alignItems="center" spacing={1.25} sx={{ mb: 3.5 }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: 56,
                height: 56,
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 24px rgba(46,125,50,0.3)",
              }}
            >
              <SpaIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Create your account
            </Typography>
            <Typography color="text.secondary" variant="body2" textAlign="center">
              Join Healthy Store and shop clean
            </Typography>
          </Stack>

          <Collapse in={Boolean(error)} sx={{ mb: error ? 2 : 0 }}>
            <Alert severity="error" onClose={() => setError("")} sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <Collapse in={success} sx={{ mb: success ? 2 : 0 }}>
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              Registration successful! Redirecting to login...
            </Alert>
          </Collapse>

          <Stack spacing={2.25}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="At least 6 characters"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      size="small"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 700 }}>
              Login
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}

export default RegisterPage
