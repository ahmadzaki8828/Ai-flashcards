"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#b0bec5",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 16,
            "& fieldset": {
              borderColor: "#333",
            },
            "&:hover fieldset": {
              borderColor: "#bb86fc",
            },
          },
        },
      },
    },
  },
});

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFliped] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "user"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFliped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGoHome = () => {
    router.push("/flashcards");
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleGoHome}>
            Go Back
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(index)}>
                  <CardContent>
                    <Box
                      sx={{
                        perspective: "1000px",
                        "& > div": {
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        },
                        "& > div > div": {
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                        },
                        "& > div > div:nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography
                            variant="h5"
                            component="div"
                            color="text.primary"
                          >
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="h5"
                            component="div"
                            color="text.primary"
                          >
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
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
