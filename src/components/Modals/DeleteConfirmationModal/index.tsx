import React from "react";
import { Modal, Typography } from "@mui/material";
import { ModalButtonContainer, ModalContent } from "../../Boxes";
import { PrimaryButton, SecondaryButton } from "../../Buttons";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6">Confirm Delete</Typography>
        <Typography>Are you sure you want to delete this user?</Typography>
        <ModalButtonContainer>
          <PrimaryButton onClick={onDelete}>Delete</PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  );
};
