import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "..";

describe("LoadingScreen Component", () => {
  it("renders a loading spinner", () => {
    render(<LoadingScreen />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeTruthy();
  });
});
