import React from "react";
import {
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { Gender, User } from "../../../api";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { ModalButtonContainer, ModalContent } from "../../Boxes";

export type FormValues = Omit<User, "id">;

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const UserFormModal = ({
  open,
  onClose,
  isEdit,
  handleSubmit,
  register,
  setValue,
  watch,
  errors,
}: UserFormModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6">
          {isEdit ? "Edit User" : "Add User"}
        </Typography>
        <form onSubmit={handleSubmit}>
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
            </Select>
            {errors.gender && (
              <Typography color="error">Gender is required</Typography>
            )}
          </FormControl>
          <TextField
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 5,
                message: "First Name must be at least 5 characters long",
              },
              maxLength: {
                value: 20,
                message: "First Name cannot be longer than 20 characters",
              },
            })}
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />
          <TextField
            label="Last Name"
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 5,
                message: "Last Name must be at least 5 characters long",
              },
              maxLength: {
                value: 20,
                message: "Last Name cannot be longer than 20 characters",
              },
            })}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
          <TextField
            label="Age"
            type="number"
            {...register("age", {
              required: "Age is required",
              min: {
                value: 18,
                message: "Age must be at least 18",
              },
              max: {
                value: watch("gender") === "Male" ? 112 : 117,
                message:
                  watch("gender") === "Male"
                    ? "Maximum age for males is 112"
                    : "Maximum age for females is 117",
              },
            })}
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <ModalButtonContainer>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">
              {isEdit ? "Save" : "Add"}
            </PrimaryButton>
          </ModalButtonContainer>
        </form>
      </ModalContent>
    </Modal>
  );
};
