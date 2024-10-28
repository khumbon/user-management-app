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
import { Gender, User } from "../../../api/graphql/types";
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
              {...register("gender")}
              value={watch("gender") || ""}
              onChange={(e) => setValue("gender", e.target.value as Gender)}
              error={!!errors.gender}
            >
              <MenuItem value="Female">{Gender.FEMALE}</MenuItem>
              <MenuItem value="Male">{Gender.MALE}</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error">
                Gender is required
              </Typography>
            )}
          </FormControl>
          <TextField
            label="First Name"
            {...register("firstName")}
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />
          <TextField
            label="Last Name"
            {...register("lastName")}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
          <TextField
            label="Age"
            type="number"
            {...register("age")}
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <ModalButtonContainer>
            <PrimaryButton type="submit">
              {isEdit ? "Save Changes" : "Add User"}
            </PrimaryButton>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          </ModalButtonContainer>
        </form>
      </ModalContent>
    </Modal>
  );
};
