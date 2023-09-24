import * as React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import CardShadow from "../../../../components/Card/CardShadow";
import ReportIcon from "@mui/icons-material/Report";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import BorderedButton from "../../../../components/Button/BorderedButton";

import styles from "./SuccessVerification.module.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from "../../../../components/Button/PrimaryButton";

export default function SuccessVerification({ openModal = false }) {
    const [open, setOpen] = React.useState(openModal);
    const [selectedViolation, setSelectedViolation] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const reportHandler = () => {
        if (selectedViolation.length === 0) {
            return;
        }

        const userViolations = violations
            .filter((data) => selectedViolation.includes(data.id))
            .map((data) => data.name);

        console.log(userViolations);
        setSelectedViolation([]);
        setOpen(false);
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={`${styles["report"]}`}>
                    <CardShadow>
                        <div className={`${styles["report-container"]}`}>
                            <div className={`${styles['outer']}`}>
                                <CheckCircleIcon className={`${styles['success-icon']}`} style={{fontSize: '70px'}}/>
                            </div>

                            <h2 style={{paddingTop: '28px'}}>Submitted Successfully!</h2>

                            <p className="capstion" style={{paddingTop: '53px', paddingBottom: '110px'}}>Account verification may take 24 hours. Thank you for your patience!</p>

                            <Link to='/profile'><PrimaryButton>Go back to Profile</PrimaryButton></Link>
                        </div>
                    </CardShadow>
                </div>
            </Modal>
        </div>
    );
}
