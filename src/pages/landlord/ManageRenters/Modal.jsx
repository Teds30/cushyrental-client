import React, { useState } from "react";
import Box from "@mui/material/Box";
import styles from "./ManageRenters.module.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import BorderedButton from "../../../components/Button/BorderedButton";
// import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
  gap: "16px",
};

function TerminateConfirmationModal({ open, onClose, onTerminate }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="terminate-modal-title"
            aria-describedby="terminate-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="terminate-modal-title"
                    variant="h6"
                    component="h2"

                >
                    Confirm Termination
                </Typography>
                <Typography id="terminate-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to terminate the selected users?
                </Typography>

                <div style={buttonContainerStyle}>
                <PrimaryButton

                    btnType="danger"
                    onClick={onTerminate}
                    sx={{ mt: 2 }}
                >
                    Terminate
                </PrimaryButton>
                <BorderedButton
                    variant="outlined"
                    onClick={onClose}
                    sx={{ mt: 2, ml: 2 }}
                >
                    Cancel
                </BorderedButton>
                </div>
            </Box>
        </Modal>
    );
}

export default TerminateConfirmationModal;
