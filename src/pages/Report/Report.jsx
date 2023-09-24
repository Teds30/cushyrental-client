import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import CardClose from "../../components/Card/CardClose";
import ReportIcon from "@mui/icons-material/Report";
import CheckBox from "../../components/CheckBox/CheckBox";
import BorderedButton from "../../components/Button/BorderedButton";

import styles from "./Report.module.css";

const violations = [
    {
        id: 1,
        name: "Scam",
    },
    {
        id: 2,
        name: "Unrelated Upload",
    },
    {
        id: 3,
        name: "Irrelevant Reviews and Profanity",
    },
];

export default function Report({ openModal = false }) {
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
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={`${styles["report"]}`}>
                    <CardClose
                        filled="false"
                        onClose={() => {
                            setOpen(false);
                        }}
                    >
                        <div className={`${styles["report-container"]}`}>
                            <div className={`${styles["container-title"]}`}>
                                <ReportIcon className={styles.icon} />
                                <p className={styles.title}>Report</p>
                            </div>

                            <div className={styles["hr"]}></div>

                            <div
                                className={`${styles["report-container-main"]}`}
                            >
                                <p className="caption">
                                    Reasons for report are based from the
                                    violations provided below:
                                </p>
                                <p className="caption">
                                    <span className={`${"caption-title"}`}>
                                        Scam.
                                    </span>{" "}
                                    The user has requested for a certain
                                    quantity of units. However, there has been
                                    no further update or communication regarding
                                    the matter. There may be several reasons
                                    provided by the user for the delay, or the
                                    user may have disappeared without any
                                    notice, leaving the unit availed unused.
                                    Moreover, it appears that the system has
                                    been utilized not in the appropriate manner,
                                    but rather for deceitful purposes.:
                                </p>

                                <p className="caption">
                                    <span className={`${"caption-title"}`}>
                                        Unrelated Uploads.
                                    </span>{" "}
                                    User posted irrelevant photo and is not
                                    related to rental of boarding house.{" "}
                                </p>

                                <p className="caption">
                                    <span className={`${"caption-title"}`}>
                                        Errelevant Reviews and Profanity.
                                    </span>{" "}
                                    The user submits reviews that include
                                    offensive language and irrelevant comments.
                                </p>
                            </div>

                            <div className={`${styles["violation-section"]}`}>
                                <p className={`${styles["violation-title"]}`}>
                                    Select the violation that applies to your
                                    report.
                                </p>

                                <div>
                                    <div style={{ paddingLeft: "20px" }}>
                                        <CheckBox
                                            items={violations}
                                            selectedValue={selectedViolation}
                                            onSelectedUsers={(
                                                selectedValue
                                            ) => {
                                                setSelectedViolation(
                                                    selectedValue
                                                );
                                                setOpen(true);
                                            }}
                                        />
                                    </div>

                                    <div
                                        className={`${styles["report-buttton"]}`}
                                    >
                                        <BorderedButton
                                            width="100%"
                                            btnType="danger"
                                            onClick={reportHandler}
                                        >
                                            Report
                                        </BorderedButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardClose>
                </div>
            </Modal>
        </div>
    );
}
