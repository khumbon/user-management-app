import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { User } from "../../api";
import { SecondaryButton } from "../Buttons";

interface UserTableProps {
  users: Array<User> | undefined;
  handleShowModal: (user: User) => void;
  setUserToDelete: (user: User) => void;
  setShowDeleteModal: (open: boolean) => void;
}

export const UserTable = ({
  users,
  handleShowModal,
  setUserToDelete,
  setShowDeleteModal,
}: UserTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof User) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortUsers = (users: User[]) => {
    if (!sortColumn) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  const sortedUsers = users ? sortUsers(users) : [];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "gender"}
                direction={sortOrder}
                onClick={() => handleSort("gender")}
              >
                Gender
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "firstName"}
                direction={sortOrder}
                onClick={() => handleSort("firstName")}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "lastName"}
                direction={sortOrder}
                onClick={() => handleSort("lastName")}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "age"}
                direction={sortOrder}
                onClick={() => handleSort("age")}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortUsers.length > 0 &&
            sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <SecondaryButton onClick={() => handleShowModal(user)}>
                    Edit
                  </SecondaryButton>
                  <IconButton
                    onClick={() => {
                      setUserToDelete(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
