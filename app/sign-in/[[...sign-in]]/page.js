"use client";

import { SignIn } from "@clerk/nextjs";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Box,
  Button,
  Grid,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";

// Create a dark theme based on the provided configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0D0D1E",
      paper: "#1A1A2E",
    },
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#FF6584",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 30,
          boxShadow: "none",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        },
      },
    },
  },
});

export default function SignInPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters sx={{ padding: 0 }}>
        <AppBar
          position="static"
          sx={{
            borderRadius: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                href="/"
                passHref
                style={{
                  textDecoration: "none",
                  color: darkTheme.palette.text.primary,
                }}
              >
                MindCraft
              </Link>
            </Typography>
            <Button
              color="inherit"
              href="/"
              sx={{ color: darkTheme.palette.text.primary }}
            >
              Go Home
            </Button>
            <Button
              color="inherit"
              href="/sign-in"
              sx={{ color: darkTheme.palette.text.primary }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              href="/sign-up"
              sx={{ color: darkTheme.palette.text.primary }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: 3,
                backgroundColor: darkTheme.palette.background.paper,
                borderRadius: 16,
                maxWidth: "600px",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography variant="h4" gutterBottom color="text.primary">
                Sign In
              </Typography>
              <SignIn />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
