"use client";

import { SignUp } from "@clerk/nextjs";
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

export default function SignInPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters sx={{ padding: 0 }}>
        <AppBar position="static" sx={{ borderRadius: 0 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                href="/"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Flashcard SaaS
              </Link>
            </Typography>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: 3,
                backgroundColor: darkTheme.palette.background.paper,
                borderRadius: 2,
                maxWidth: "600px",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                mt: 5,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
              <SignUp />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
