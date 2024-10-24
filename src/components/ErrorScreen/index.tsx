import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const ErrorContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#f8d7da",
});

const ErrorMessage = styled(Typography)({
  color: "#721c24",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const RetryButton = styled(Button)({
  backgroundColor: "#721c24",
  color: "white",
  "&:hover": {
    backgroundColor: "#5c141a",
  },
});

interface ErrorScreenProps {
  errorMessage?: string;
  onRetry: () => void;
}

const ErrorScreen = ({ errorMessage, onRetry }: ErrorScreenProps) => {
  return (
    <ErrorContainer>
      <ErrorMessage>
        {errorMessage || "Something went wrong. Please try again."}
      </ErrorMessage>
      <RetryButton variant="contained" onClick={onRetry}>
        Retry
      </RetryButton>
    </ErrorContainer>
  );
};

export default ErrorScreen;
