import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import {
  addUserMutation,
  deleteUserMutation,
  editUserMutation,
  useGetUsersQuery,
  User,
} from "../../api";
import { Add as AddIcon } from "@mui/icons-material";
import ErrorScreen from "../ErrorScreen";
import { LoadingScreen } from "../LoadingScreen";
import { UserTable } from "../UserTable";
import { DeleteConfirmationModal, FormValues, UserFormModal } from "../Modals";
import { QueryCache, QueryClient } from "@tanstack/react-query";

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

interface UserManagerProps {
  queryClient: QueryClient;
}

export const UserManager = ({ queryClient }: UserManagerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userAlert, setUserAlert] = useState<string | null>(null);
  const { data, isLoading, isError, error } = useGetUsersQuery();

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

  const usersUpdate = (alert: string) => {
    return {
      onSuccess: () => {
        setUserAlert(alert);
        resetUserAlert();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    };
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

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if (isEdit && selectedUser) {
      await editUser.mutate(
        { id: selectedUser?.id, ...formValues },
        usersUpdate("User updated"),
      );
    } else {
      await addUser.mutate(formValues, usersUpdate("User added"));
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (userToDelete?.id) {
      deleteUser.mutate(userToDelete?.id, usersUpdate("User deleted"));
      setShowDeleteModal(false);
    }
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

      <UserTable
        users={data?.data?.users}
        handleShowModal={handleShowModal}
        setUserToDelete={setUserToDelete}
        setShowDeleteModal={setShowDeleteModal}
      />
      <UserFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        isEdit={isEdit}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <DeleteConfirmationModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </CustomContainer>
  );
};
