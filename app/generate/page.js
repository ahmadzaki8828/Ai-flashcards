"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
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
  Paper,
  TextField,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Head from "next/head";
import { SignedIn, UserButton } from "@clerk/nextjs";

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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
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
              borderColor: "#6C63FF",
            },
          },
        },
      },
    },
  },
});

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("api/generate", {
        method: "POST",
        body: text,
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "user"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const collection = docSnap.data().flashcards || [];
        if (collection.find((f) => f.name === name)) {
          alert("Flashcard collection with the same name already exists");
          setIsSaving(false);
          return;
        } else {
          collection.push({ name });
          batch.set(userDocRef, { flashcards: collection }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }

      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();
      handleClose();
      router.push("flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Head>
        <title>MindCraft - Generate Flashcards</title>
        <meta name="description" content="Generate flashcards using AI" />
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
          <Button
            color="inherit"
            onClick={handleGoHome}
            sx={{
              mr: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            Home
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Generate Flashcards
          </Typography>
          <Paper sx={{ p: 4, width: "100%", borderRadius: 4 }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter Text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              disabled={isGenerating}
            >
              {isGenerating ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      position: "relative",
                      width: "100%",
                      height: 200,
                      perspective: "1000px",
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(index)}
                      sx={{ height: "100%" }}
                    >
                      <CardContent
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transformStyle: "preserve-3d",
                          transition: "transform 0.6s",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 2,
                            boxSizing: "border-box",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ px: 4 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcard</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Please enter a name for your flashcards collection
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isSaving}>
              Close
            </Button>
            <Button
              onClick={saveFlashCards}
              disabled={!name.trim() || isSaving}
              color="primary"
              variant="contained"
            >
              {isSaving ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
