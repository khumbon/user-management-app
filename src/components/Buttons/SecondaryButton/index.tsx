import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const SecondaryButton = styled(Button)({
  flexBasis: "33.33%",
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});
