import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Alert = styled(Box)({
  backgroundColor: "black",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: "20px",
});
