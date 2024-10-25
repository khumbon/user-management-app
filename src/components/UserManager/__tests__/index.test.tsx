import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as api from "../../../api";
import { UserManager } from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockedProvider } from "@apollo/react-testing";

const useGetUsersQuerySpy = jest.spyOn(api, "useGetUsersQuery");
const queryClient = new QueryClient();

describe("UserManager Component", () => {
  const mockUsers = [
    { id: "1", firstName: "John", lastName: "Doe", age: 30, gender: "Male" },
    { id: "2", firstName: "Jane", lastName: "Doe", age: 28, gender: "Female" },
  ];

  const mocks = [...api.queryMocks, ...api.mutationMocks];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MockedProvider mocks={mocks}>
        <QueryClientProvider client={queryClient}>
          <UserManager queryClient={queryClient} />
        </QueryClientProvider>
      </MockedProvider>,
    );
  it("renders loading screen while fetching users", () => {
    api.mockUseQuery(useGetUsersQuerySpy, {}, { isLoading: true });

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it("renders error screen on fetch error", () => {
    api.mockUseQuery(
      useGetUsersQuerySpy,
      {},
      {
        isLoading: false,
        isError: true,
        error: { message: "Fetch error" },
      },
    );

    renderComponent();

    expect(screen.getByText(/unable to fetch users/i)).toBeTruthy();
  });

  it("renders the user list", () => {
    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    expect(screen.getByText(/users/i)).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("Jane Doe")).toBeTruthy();
  });

  it("opens modal to add a user", () => {
    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    expect(screen.getByText("Add User")).toBeTruthy();
  });

  it("submits the form to add a user", async () => {
    const addUserMutation = jest.fn();
    jest.mocked(addUserMutation).mockReturnValue({ mutate: addUserMutation });

    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "22" },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: "Female" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(addUserMutation).toHaveBeenCalled();
    });
  });

  it("opens modal to edit a user", () => {
    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(screen.getByText("Edit User")).toBeTruthy();
  });

  it("submits the form to edit a user", async () => {
    const editUserMutation = jest.fn();
    jest.mocked(editUserMutation).mockReturnValue({ mutate: editUserMutation });

    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane Updated" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(editUserMutation).toHaveBeenCalled();
    });
  });

  it("opens delete confirmation modal", () => {
    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText(/are you sure/i)).toBeTruthy();
  });

  it("confirms user deletion", async () => {
    const deleteUserMutation = jest.fn();
    jest
      .mocked(deleteUserMutation)
      .mockReturnValue({ mutate: deleteUserMutation });

    api.mockUseQuery(
      useGetUsersQuerySpy,
      { data: { users: mockUsers } },
      {
        isLoading: false,
        isError: false,
      },
    );

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() => {
      expect(deleteUserMutation).toHaveBeenCalled();
    });
  });
});
