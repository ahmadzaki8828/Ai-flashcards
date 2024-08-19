"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Use the same dark theme from your Home component
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      },
    },
  },
});

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "user"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collection = docSnap.data().flashcards || [];
        setFlashcards(collection);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleGoHome}>
            Go Home
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h6" color="text.primary">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
