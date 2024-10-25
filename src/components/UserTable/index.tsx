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
import { sortUsers } from "./utils";

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

  const sortedUsers = users ? sortUsers(users, sortColumn, sortOrder) : [];

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
          {sortedUsers.length > 0 &&
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
