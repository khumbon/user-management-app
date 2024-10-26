import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Gender, User } from "../../../api/graphql/types";
import { UserTable } from "..";

describe("UserTable Component", () => {
  const users: User[] = [
    {
      id: "1",
      gender: Gender.Male,
      firstName: "John",
      lastName: "Doe",
      age: 30,
    },
    {
      id: "2",
      gender: Gender.Female,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
    },
  ];

  const handleShowModalMock = jest.fn();
  const setUserToDeleteMock = jest.fn();
  const setShowDeleteModalMock = jest.fn();

  beforeEach(() => {
    handleShowModalMock.mockClear();
    setUserToDeleteMock.mockClear();
    setShowDeleteModalMock.mockClear();
  });

  it("renders table headers and data rows correctly", () => {
    render(
      <UserTable
        users={users}
        handleShowModal={handleShowModalMock}
        setUserToDelete={setUserToDeleteMock}
        setShowDeleteModal={setShowDeleteModalMock}
      />,
    );

    expect(screen.getByText("Gender")).toBeTruthy();
    expect(screen.getByText("First Name")).toBeTruthy();
    expect(screen.getByText("Last Name")).toBeTruthy();
    expect(screen.getByText("Age")).toBeTruthy();
    expect(screen.getByText("Actions")).toBeTruthy();

    users.forEach((user) => {
      expect(screen.getByText(user.gender)).toBeTruthy();
      expect(screen.getByText(user.firstName)).toBeTruthy();
      expect(screen.getByText(user.lastName)).toBeTruthy();
      expect(screen.getByText(String(user.age))).toBeTruthy();
    });
  });

  it("calls handleShowModal when edit button is clicked", () => {
    render(
      <UserTable
        users={users}
        handleShowModal={handleShowModalMock}
        setUserToDelete={setUserToDeleteMock}
        setShowDeleteModal={setShowDeleteModalMock}
      />,
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(handleShowModalMock).toHaveBeenCalledWith(users[0]);
    expect(handleShowModalMock).toHaveBeenCalledTimes(1);
  });

  it("calls setUserToDelete and setShowDeleteModal when delete button is clicked", () => {
    render(
      <UserTable
        users={users}
        handleShowModal={handleShowModalMock}
        setUserToDelete={setUserToDeleteMock}
        setShowDeleteModal={setShowDeleteModalMock}
      />,
    );

    const deleteButtons = screen.getAllByRole("button");
    screen.debug()
    fireEvent.click(deleteButtons[1]);

    expect(setUserToDeleteMock).toHaveBeenCalledWith(users[0]);
    expect(setUserToDeleteMock).toHaveBeenCalledTimes(1);
    expect(setShowDeleteModalMock).toHaveBeenCalledWith(true);
    expect(setShowDeleteModalMock).toHaveBeenCalledTimes(1);
  });

  it("toggles sorting order when a column header is clicked", () => {
    render(
      <UserTable
        users={users}
        handleShowModal={handleShowModalMock}
        setUserToDelete={setUserToDeleteMock}
        setShowDeleteModal={setShowDeleteModalMock}
      />,
    );

    const ageHeader = screen.getByText("Age");

    fireEvent.click(ageHeader);
    expect(screen.getAllByRole("row")[1].textContent).toContain(
      String(users[1].age),
    );
    expect(screen.getAllByRole("row")[2].textContent).toContain(
      String(users[0].age),
    );

    fireEvent.click(ageHeader);
    expect(screen.getAllByRole("row")[1].textContent).toContain(
      String(users[0].age),
    );
    expect(screen.getAllByRole("row")[2].textContent).toContain(
      String(users[1].age),
    );
  });

  it("sorts by selected column in ascending order on initial click", () => {
    render(
      <UserTable
        users={users}
        handleShowModal={handleShowModalMock}
        setUserToDelete={setUserToDeleteMock}
        setShowDeleteModal={setShowDeleteModalMock}
      />,
    );

    const firstNameHeader = screen.getByText("First Name");

    fireEvent.click(firstNameHeader);

    expect(screen.getAllByRole("row")[1].textContent).toContain(
      users[1].firstName,
    );
    expect(screen.getAllByRole("row")[2].textContent).toContain(
      users[0].firstName,
    );
  });
});
