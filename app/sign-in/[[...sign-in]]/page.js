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

export default function SignInPage() {
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
      text: {
        primary: "#ffffff",
        secondary: "#b0bec5",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flashcard SaaS
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
              }}
            >
              <Typography variant="h4" gutterBottom>
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
