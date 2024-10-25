import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FieldErrors } from "react-hook-form";
import { FormValues, UserFormModal } from "..";

describe("UserFormModal Component", () => {
  const mockOnClose = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockSetValue = jest.fn();
  const mockWatch = jest.fn();
  const mockRegister = jest.fn();
  const mockErrors: FieldErrors<FormValues> = {
    firstName: { type: "required", message: "First name is required" },
    lastName: { type: "required", message: "Last name is required" },
    age: { type: "required", message: "Age is required" },
    gender: { type: "required", message: "Gender is required" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (isEdit = false, open = true) => {
    return render(
      <UserFormModal
        open={open}
        onClose={mockOnClose}
        isEdit={isEdit}
        handleSubmit={mockHandleSubmit}
        register={mockRegister}
        setValue={mockSetValue}
        watch={mockWatch}
        errors={mockErrors}
      />,
    );
  };

  it("renders the modal with correct content for adding user", () => {
    renderComponent();

    expect(screen.getByText("Add User")).toBeTruthy();
    expect(screen.getByLabelText("Gender")).toBeTruthy();
    expect(screen.getByLabelText("First Name")).toBeTruthy();
    expect(screen.getByLabelText("Last Name")).toBeTruthy();
    expect(screen.getByLabelText("Age")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Add" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeTruthy();
  });

  it("renders the modal with correct content for editing user", () => {
    renderComponent(true);

    expect(screen.getByText("Edit User")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("closes the modal when the cancel button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("submits the form with correct values", () => {
    renderComponent();

    mockWatch.mockReturnValue("Female");
    mockRegister.mockReturnValue({
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    });

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "25" } });

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("displays validation errors", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Gender is required")).toBeTruthy();
    expect(screen.getByText("First name is required")).toBeTruthy();
    expect(screen.getByText("Last name is required")).toBeTruthy();
    expect(screen.getByText("Age is required")).toBeTruthy();
  });

  it("does not render the modal when closed", () => {
    renderComponent(false, false);

    expect(screen.queryByText("Add User")).not.toBeTruthy();
  });
});
