import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Loading = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const LoadingScreen = () => {
  return (
    <Loading>
      <CircularProgress />
    </Loading>
  );
};
