import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const PrimaryButton = styled(Button)({
  flexBasis: "66.66%",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#333",
  },
});
