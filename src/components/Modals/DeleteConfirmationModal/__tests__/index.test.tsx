import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteConfirmationModal } from "..";

describe("DeleteConfirmationModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with correct content when open", () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText(/confirm delete/i)).toBeTruthy();
    expect(
      screen.getByText(/are you sure you want to delete this user/i),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /delete/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeTruthy();
  });

  it("does not render the modal when closed", () => {
    render(
      <DeleteConfirmationModal
        open={false}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.queryByText(/confirm delete/i)).not.toBeTruthy();
  });

  it("calls onDelete when the delete button is clicked", () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the cancel button is clicked", () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
