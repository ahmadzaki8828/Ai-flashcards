"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Container, Typography, Button } from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const fetchCheckoutSession = async () => {
    if (!session_id) return;

    try {
      const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
      const sessionData = await res.json();
      if (res.ok) {
        setSession(sessionData);
      } else {
        setError(sessionData.error);
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the session data whenever the page is visited
    fetchCheckoutSession();
  }, [session_id, router.pathname]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="error">
                {error}
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Oops! Something went wrong while processing your request. Please try again later or return to the homepage.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => router.push('/')}>
                    Go to Home Page
                </Button>
            </Box>
        </Container>
    );
}

  return (
    <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
      {session?.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for purchasing</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment Failed</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push('/')}>
              Go to Home Page
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ResultPage;
