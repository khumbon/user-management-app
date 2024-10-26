import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorScreen from "..";

describe("ErrorScreen Component", () => {
  const mockOnRetry = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the error message passed as a prop", () => {
    const errorMessage = "Network Error!";

    render(<ErrorScreen errorMessage={errorMessage} onRetry={mockOnRetry} />);

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it("renders a default error message when no error message is passed", () => {
    render(<ErrorScreen onRetry={mockOnRetry} />);

    expect(
      screen.getByText("Something went wrong. Please try again."),
    ).toBeTruthy();
  });

  it("calls onRetry when the retry button is clicked", () => {
    render(<ErrorScreen onRetry={mockOnRetry} />);

    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });
});
