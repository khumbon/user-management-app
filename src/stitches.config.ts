import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      primary: "#007bff",
      secondary: "#6c757d",
      danger: "#dc3545",
      white: "#ffffff",
      black: "#000000",
      lightGray: "#f8f9fa",
      gray: "#6c757d",
      darkGray: "#343a40",
    },
    fontSizes: {
      sm: "12px",
      md: "16px",
      lg: "18px",
    },
  },
  utils: {
    marginX: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});
