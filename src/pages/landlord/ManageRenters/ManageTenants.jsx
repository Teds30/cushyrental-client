import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import useHttp from "../../../hooks/http-hook";
import Checkbox from "@mui/material/Checkbox";

import SearchField from "../../../components/Search/SearchField";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../components/Button/BorderlessButton";
import CheckBox from "../../../components/CheckBox/CheckBox";
import TerminateConfirmationModal from "./Modal";
import ManageRenterImage from "./ManageRenterImage";
import useRental from "../../../hooks/data/rental-hook";

import styles from "./ManageRenters.module.css";

const ManageTenants = (props) => {
    const { tenants, onRefresh } = props;

    const [filteredData, setFilteredData] = useState(tenants);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [terminateModalOpen, setTerminateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const cbRef = useRef(null);
    const { error, sendRequest } = useHttp();
    const { terminateUser, isLoading } = useRental();

    console.log(tenants);

    // useEffect(() => {
    //     setFilteredData(tenants)
    // }, [tenants])

    const handleSearch = (event) => {
        const keywords = event.target.value.toLowerCase();
        const newList = tenants.filter((data) => {
            const fullName = `${data.user.first_name} ${data.user.middle_name} ${data.user.last_name}`;
            return fullName.toLowerCase().includes(keywords);
        });
        setFilteredData(newList);
    };

    const formatDate = (dateString) => {
        const date = moment(dateString);
        const formattedDate = date.format("DD/MM/YYYY | hh:mm A");
        return formattedDate;
    };

    // const GenderToText = (gender) => {
    //     if (gender === 1) {
    //         return "Male";
    //     } else if (gender === 2) {
    //         return "Female";
    //     } else if (gender === 3) {
    //         return "Not to specify";
    //     } else {
    //         return "Unknown";
    //     }
    // };

    const handleChange = (event) => {
        if (checked) {
            setSelectedUsers([]);
        } else {
            const allUserIds = tenants.map((user) => user.id);
            setSelectedUsers(allUserIds);
        }
        setSelectAllChecked(!selectAllChecked);
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setChecked(false);
        }
    }, [selectedUsers, setChecked]);

    // const handleSelectAllChecked = () => {
    //     if (selectAllChecked) {
    //         setSelectedUsers([]);
    //     } else {
    //         const allUserIds = tenants.map((user) => user.id);
    //         setSelectedUsers(allUserIds);
    //     }
    //     setSelectAllChecked(!selectAllChecked);

    //     console.log("Selected User IDs:", selectedUsers);
    // };

    const handleToggleCheckboxes = () => {
        setShowCheckboxes(true);
    };

    const handleCancelClick = () => {
        setSelectedUsers([]);
        setShowCheckboxes(false);
        setSelectAllChecked(false);
    };

    const handleTerminateClick = () => {
        if (selectedUsers.length > 0) {
            setTerminateModalOpen(true);
        }
    };

    const handleTerminateConfirm = async () => {
        if (selectedUsers.length > 0) {
            for (const userId of selectedUsers) {
                const res = await terminateUser(userId);
                onRefresh();
                setFilteredData(filteredData.filter(tenant => tenant.id !== userId));
                setTerminateModalOpen(false);
            }
        } else {
        }
    };

    return (
        <div className={`${styles["main-container"]} `}>
            <div className={`${styles["search-box"]} `}>
                <SearchField
                    placeholder="Search"
                    onChange={handleSearch}
                ></SearchField>
            </div>

            {tenants.length === 0 ? (
                <p className={`${styles["no-tenants-message"]} `}>
                    No Tenants Found.
                </p>
            ) : (
                <>
                    {!showCheckboxes && (
                        <div className={`${styles["select-container"]} `}>
                            <Link
                                onClick={handleToggleCheckboxes}
                                style={{ color: "var(--accent)" }}
                            >
                                Select
                            </Link>
                        </div>
                    )}

                    {showCheckboxes && (
                        <div className={`${styles["selectall-container"]} `}>
                            <Checkbox
                                checked={checked}
                                inputRef={cbRef}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{
                                    marginRight: "-8px",
                                    border: "var(--accent)",
                                    color: "var(--accent)",
                                    "&.Mui-checked": {
                                        color: "var(--accent)",
                                    },
                                    "&:hover": {
                                        color: "var(--accent)",
                                    },
                                }}
                            />
                            <Link
                                onClick={() => {
                                    cbRef.current.click();
                                }}
                                style={{ color: "var(--accent)" }}
                            >
                                Select All
                            </Link>
                        </div>
                    )}

                    {filteredData.map((user) => (
                        <div
                            key={user.id}
                            className={`${styles["tenants-main-box_container"]} `}
                            id={`user-${user.user.id}`}
                        >
                            <div
                                className={`${styles["box-container"]} ${
                                    showCheckboxes
                                        ? styles["box-container-clicked"]
                                        : ""
                                }`}
                            >
                                <div className={`${styles["box-image"]} `}>
                                    <ManageRenterImage
                                        image={user.user.profile_picture_img}
                                    />
                                </div>
                                <div className={`${styles["box-details"]} `}>
                                    <p
                                        className={`${styles["box-details-name"]} `}
                                    >
                                        {user.user.first_name}{" "}
                                        {user.user.middle_name}{" "}
                                        {user.user.last_name}
                                    </p>
                                    <p
                                        className={`${styles["box-details-unit"]} `}
                                    >
                                        {user.unit.name}
                                    </p>

                                    {/* <p className={`${styles["box-details-gender"]} `}>
                                {GenderToText(user.user.gender)}
                            </p> */}
                                    <p
                                        className={`${styles["box-details-time"]} `}
                                    >
                                        {formatDate(user.date_start)}
                                    </p>
                                </div>{" "}
                                {showCheckboxes && (
                                    <div
                                        className={`${styles["box-selected"]} `}
                                    >
                                        <CheckBox
                                            items={[{ id: user.id }]}
                                            selectedValue={selectedUsers}
                                            onCheckBox={() =>
                                                handleUserChecked(user.id)
                                            }
                                            onSelectedUsers={setSelectedUsers}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {showCheckboxes && (
                        <div className={`${styles["terminate-container"]} `}>
                            <div
                                className={`${styles["terminate-container-top"]} `}
                            >
                                <div>
                                    <p>Selected ({selectedUsers.length})</p>
                                </div>
                                <div>
                                    <BorderlessButton
                                        width="100%"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </BorderlessButton>
                                </div>
                            </div>
                            <PrimaryButton
                                width="100%"
                                btnType="danger"
                                onClick={handleTerminateClick}
                                disabled={selectedUsers.length === 0}
                            >
                                Terminate
                            </PrimaryButton>
                        </div>
                    )}
                </>
            )}
            <TerminateConfirmationModal
                open={terminateModalOpen}
                onClose={() => setTerminateModalOpen(false)}
                onTerminate={handleTerminateConfirm}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ManageTenants;
