import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TableSortLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  addUserMutation,
  deleteUserMutation,
  editUserMutation,
  Gender,
  useGetUsersQuery,
  User,
} from "../../api";
import { Add as AddIcon } from "@mui/icons-material";
import ErrorScreen from "../ErrorScreen";
import { LoadingScreen } from "../LoadingScreen";

const CustomContainer = styled(Container)({
  marginTop: "2rem",
  padding: "1rem",
  maxWidth: "900px",
});

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const AddUserButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  borderRadius: "24px",
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const ModalContent = styled(Box)({
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "40%",
  margin: "auto",
  marginTop: "10%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const ModalButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  marginTop: "1rem",
});

const PrimaryButton = styled(Button)({
  flexBasis: "66.66%",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const SecondaryButton = styled(Button)({
  flexBasis: "33.33%",
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

type FormValues = Omit<User, "id">;

export const UserManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userAlert, setUserAlert] = useState<string | null>(null);
  const { data, isLoading, isError, error } = useGetUsersQuery();
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const addUser = addUserMutation();
  const editUser = editUserMutation();
  const deleteUser = deleteUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>();

  const resetUserAlert = () => {
    setTimeout(() => setUserAlert(null), 5000);
  };

  const handleShowModal = (user?: User) => {
    setIsEdit(!!user);
    setSelectedUser(user || null);
    setShowModal(true);
    if (user) {
      reset(user);
    } else {
      reset({
        gender: undefined,
        firstName: undefined,
        lastName: undefined,
        age: undefined,
      });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    if (isEdit && selectedUser) {
      editUser.mutate(
        { id: selectedUser?.id, ...formValues },
        {
          onSuccess: () => {
            setUserAlert("User updated");
            resetUserAlert();
          },
        },
      );
    } else {
      addUser.mutate(formValues, {
        onSuccess: () => {
          setUserAlert("User added");
          resetUserAlert();
        },
      });
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (userToDelete?.id) {
      deleteUser.mutate(userToDelete?.id);
      setShowDeleteModal(false);
    }
  };

  const sortUsers = (users: User[]) => {
    if (!sortColumn) return users;

    return users.sort((a, b) => {
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

  const handleSort = (column: keyof User) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        errorMessage={error?.message || "Unable to fetch users."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const sortedUsers = data?.data.users ? sortUsers(data?.data?.users) : [];

  return (
    <CustomContainer>
      <Header>
        <Typography variant="h5">Users</Typography>
        <AddUserButton variant="contained" onClick={() => handleShowModal()}>
          <AddIcon style={{ marginRight: "0.5rem" }} />
          Add User
        </AddUserButton>
      </Header>

      {userAlert && <Box role="status">{userAlert}</Box>}
      {errors && (
        <Box role="alert">
          {Object.keys(errors).map((errorKey, index) => (
            <Typography key={index} color="error">
              {errorKey} is required.
            </Typography>
          ))}
        </Box>
      )}

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

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <Typography variant="h6">
            {isEdit ? "Edit User" : "Add User"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                label="Gender"
                {...register("gender", { required: true })}
                value={watch("gender") || ""}
                onChange={(e) => setValue("gender", e.target.value as Gender)}
                error={!!errors.gender}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Non-binary">Non-binary</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error">Gender is required</Typography>
              )}
            </FormControl>
            <TextField
              label="First Name"
              {...register("firstName", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName && "First name is required"}
            />
            <TextField
              label="Last Name"
              {...register("lastName", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName && "Last name is required"}
            />
            <TextField
              label="Age"
              type="number"
              {...register("age", { required: true, min: 0 })}
              fullWidth
              margin="normal"
              error={!!errors.age}
              helperText={errors.age && "Age is required"}
            />
            <ModalButtonContainer>
              <SecondaryButton onClick={() => setShowModal(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                {isEdit ? "Save" : "Add"}
              </PrimaryButton>
            </ModalButtonContainer>
          </form>
        </ModalContent>
      </Modal>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this user?</Typography>
          <ModalButtonContainer>
            <PrimaryButton onClick={handleDelete}>Delete</PrimaryButton>
            <SecondaryButton onClick={() => setShowDeleteModal(false)}>
              Cancel
            </SecondaryButton>
          </ModalButtonContainer>
        </ModalContent>
      </Modal>
    </CustomContainer>
  );
};
