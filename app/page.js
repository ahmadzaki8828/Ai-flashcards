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
} from "@mui/material";
import Head from "next/head";

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
        sessionId: checkoutSessionJson.id, // Fix typo here
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <description> "Create flashcard from your text"</description>
      </Head>

      {/* Top bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
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

      {/* hero section */}
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5">
          The easist way to make flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
      </Box>

      {/* feature section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              East Text Input
            </Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography>
              Our Ai intelligently breaks fown your text into concise
              flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Accessble Anywhere
            </Typography>
            <Typography>
              Access your flashcards from any device at any time. Study on the
              go with easy.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* pricing section*/}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Chose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Chose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
