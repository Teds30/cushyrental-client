import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
// import styles from "./ManageRenters.module.css";
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
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    height: '389px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "35px",
    gap: "16px",
    width : '100%',
};

function SubscriptionModal({ open, onClose, onTerminate, subscriptionId }) {
    const navigate = useNavigate();

    const subscriptionHandler = () => {
        navigate(`/avail_subscriptions/${subscriptionId}`)
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="terminate-modal-title"
            aria-describedby="terminate-modal-description"
        >
            <Box
                sx={{
                    ...style,
                    width: "70%",
                    "@media (min-width: 600px)": {
                        width: "60%",
                    },
                    "@media (min-width: 960px)": {
                        width: "50%",
                    },
                    "@media (min-width: 1280px)": {
                        width: "30%",
                    },
                    "@media (min-width: 1920px)": {
                        width: "20%",
                    },
                }}
            >
                <Typography
                    id="terminate-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: "bolder",
                        color: 'var(--accent)',
                        fontSize: '24px',
                    }}
                >
                    Subscribe
                </Typography>
                <Typography id="terminate-modal-description" sx={{ mt: 2, fontSize: '15px'}}>
                    Are you sure you want to subscribe?
                </Typography>

                <div style={buttonContainerStyle}>
                    <PrimaryButton
                        sx={{ mt: 2 }}
                        loadingText="Terminate"
                        onClick={subscriptionHandler}
                        width="100%"
                    >
                        Subscribe
                    </PrimaryButton>
                    <BorderedButton
                        btnType="danger"
                        variant="outlined"
                        onClick={onClose}
                        width="100%"
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Cancel
                    </BorderedButton>
                </div>
            </Box>
        </Modal>
    );
}

export default SubscriptionModal;
