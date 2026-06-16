import { Box, Typography, Stack } from "@mui/material"
import SpaIcon from "@mui/icons-material/Spa"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const points = [
  "Clean, carefully sourced ingredients",
  "Granola, protein bars, whey & vitamins",
  "Fast checkout and order tracking",
]

function AuthBranding() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        width: "46%",
        maxWidth: 620,
        position: "relative",
        p: 6,
        color: "primary.contrastText",
        overflow: "hidden",
        backgroundImage: "linear-gradient(180deg, rgba(27,94,32,0.92), rgba(27,94,32,0.78)), url(/auth-hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.18)",
            width: 44,
            height: 44,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SpaIcon />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          HealthyStore
        </Typography>
      </Stack>

      <Box>
        <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.85 }}>
          Eat clean, live well
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, lineHeight: 1.15, textWrap: "balance" }}>
          Wholesome food &amp; supplements, delivered fresh.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 4 }}>
          {points.map((p) => (
            <Stack key={p} direction="row" spacing={1.25} alignItems="center">
              <CheckCircleIcon sx={{ color: "secondary.light" }} />
              <Typography sx={{ opacity: 0.95, fontWeight: 600 }}>{p}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Typography variant="body2" sx={{ opacity: 0.75 }}>
        &copy; {new Date().getFullYear()} Healthy Food Store
      </Typography>
    </Box>
  )
}

export default AuthBranding
