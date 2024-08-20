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
import BackgroundImage from "@/public/hero.jpg";

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
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
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
          <title>MindCraft - AI-Powered Flashcards</title>
          <meta
            name="description"
            content="Create flashcards from your text using AI"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
              MindCraft
            </Typography>

            <SignedOut>
              <Button
                color="inherit"
                href="/sign-in"
                sx={{
                  mr: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="/sign-up"
                sx={{
                  "&:hover": {
                    backgroundColor: darkTheme.palette.primary.dark,
                  },
                }}
              >
                Sign Up
              </Button>
            </SignedOut>

            <SignedIn>
              <Button
                variant="contained"
                color="secondary" // Button color remains consistent with the primary theme color
                href="/flashcards"
                sx={{
                  fontSize: "0.875rem", // Reduced font size
                  fontWeight: 600,
                  paddingX: 2, // Reduced padding
                  paddingY: 1, // Reduced padding
                  backgroundColor: darkTheme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: darkTheme.palette.primary.dark,
                  },
                  mr: 2,
                }}
              >
                Your Collections
              </Button>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            textAlign: "center",
            py: 15,
            px: 4,
            backgroundImage: `url(${BackgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(13, 13, 30, 0.7)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Begin Your MindCraft Adventure <br /> in Minutes!
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Effortlessly Create Flashcards with AI Magic!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
                m: 2,
                "&:hover": { backgroundColor: darkTheme.palette.primary.dark },
              }}
              href="/generate"
            >
              Get Started
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 12, px: 4 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={8}
            color="text.primary"
          >
            How to use MindCraft
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                title: "AI-Powered Generation",
                description:
                  "Our advanced AI algorithms create tailored flashcards from your input text.",
                icon: "🤖",
              },
              {
                title: "Smart Organization",
                description:
                  "Automatically organize your flashcards into decks and categories for efficient studying.",
                icon: "📚",
              },
              {
                title: "Cross-Platform Sync",
                description:
                  "Access your flashcards seamlessly across all your devices.",
                icon: "🔄",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 4,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 12, px: 4, backgroundColor: "rgba(26, 26, 46, 0.5)" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={8}
            color="text.primary"
          >
            Choose Your Plan
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                title: "Free",
                price: "$0",
                features: ["Basic flashcard creation", "Limited to 50 flashcards", "AI-based content generation (limited)", "Basic support"],
              },
              {
                title: "Pro",
                price: "$10",
                features: [
                  "Unlimited AI-generated flashcards",
                  "Advanced organization",
                  "Cross-platform sync",
                  "Priority support",
                ],
              },
            ].map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 4,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${darkTheme.palette.primary.main}`,
                  }}
                >
                  <div>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {plan.price}{" "}
                      <Typography component="span" variant="h6">
                        /month
                      </Typography>
                    </Typography>
                    <Box sx={{ my: 4 }}>
                      {plan.features.map((feature, idx) => (
                        <Typography
                          key={idx}
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </div>
                  {
                    plan.title === "Free" ? <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                          mt: 2,
                          "&:hover": { backgroundColor: darkTheme.palette.primary.dark },
                        }}
                        href="/generate"
                      >
                        Get Started
                      </Button>
                    </> : <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                          mt: 2,
                          "&:hover": { backgroundColor: darkTheme.palette.primary.dark },
                        }}
                        onClick={handleSubmit}
                      >
                        Choose {plan.title}
                      </Button>
                    </>
                  }
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8, px: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Start Your Learning Journey?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 6, py: 2, fontSize: "1.2rem", fontWeight: "bold" }}
            href="/generate"
          >
            Create Flashcards Now
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
