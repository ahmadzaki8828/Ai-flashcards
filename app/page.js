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
            <Button color="inherit">Login</Button>
            <Button color="inherit">sign Up</Button>
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
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      {/* feature section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" components="h2">
          Features
        </Typography>
        <Grid contained spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">East Text Input</Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier
            </Typography>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Our Ai intelligently breaks fown your text into concise
                flashcards, perfect for studying.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Accessble Anywhere</Typography>
              <Typography>
                Access your flashcards from any device at any time. Study on the
                go with easy.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
