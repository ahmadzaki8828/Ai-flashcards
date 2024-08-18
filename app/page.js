"use client";

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
  CssBaseline,
} from "@mui/material";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#03dac6",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 24,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default function Home() {
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: location.origin,
        },
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.status === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters sx={{ padding: 0 }}>
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        {/* Top bar */}
        <AppBar position="static" sx={{ borderRadius: 0 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        {/* Hero section */}
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            backgroundColor: darkTheme.palette.background.default,
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                py: 2,
                fontSize: "1rem",
                fontWeight: "bold",
                "&:hover": { backgroundColor: darkTheme.palette.primary.main },
              }}
              href="/generate"
            >
              Get Started
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                px: 4,
                py: 2,
                fontSize: "1rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: darkTheme.palette.secondary.main,
                },
              }}
              href="/flashcards"
            >
              Your Flashcards
            </Button>
          </Box>
        </Box>

        {/* Feature section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={5}
            color="text.primary"
          >
            Features
          </Typography>
          <Grid
            container
            spacing={6}
            justifyContent="center"
            sx={{
              maxWidth: "1200px",
              margin: "0 auto", // Center the grid container
              paddingX: "16px", // Add horizontal padding to avoid hugging edges
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  backgroundColor: darkTheme.palette.background.paper,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Easy Text Input
                </Typography>
                <Typography color="text.secondary">
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  backgroundColor: darkTheme.palette.background.paper,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Smart Flashcards
                </Typography>
                <Typography color="text.secondary">
                  Our AI intelligently breaks down your text into concise
                  flashcards, perfect for studying.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  backgroundColor: darkTheme.palette.background.paper,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Accessible Anywhere
                </Typography>
                <Typography color="text.secondary">
                  Access your flashcards from any device at any time. Study on
                  the go with ease.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={5}
            color="text.primary"
          >
            Pricing
          </Typography>
          <Grid
            container
            spacing={6}
            justifyContent="center"
            sx={{
              maxWidth: "1200px",
              margin: "0 auto", // Center the grid container
              paddingX: "16px", // Add horizontal padding to avoid hugging edges
            }}
          >
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  backgroundColor: darkTheme.palette.background.paper,
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  $5 / month
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: darkTheme.palette.primary.main,
                    },
                  }}
                >
                  Choose Basic
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  textAlign: "center",
                  backgroundColor: darkTheme.palette.background.paper,
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  $10 / month
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Unlimited flashcards and storage, with priority support.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: darkTheme.palette.primary.main,
                    },
                  }}
                >
                  Choose Pro
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            backgroundColor: darkTheme.palette.background.default,
            color: darkTheme.palette.text.secondary,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Flashcard SaaS. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
