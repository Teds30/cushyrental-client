import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/http-hook";
import Checkbox from "@mui/material/Checkbox";
import styles from "./ManageRenters.module.css";
import SearchField from "../../../components/Search/SearchField";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../components/Button/BorderlessButton";
import CheckBox from "../../../components/CheckBox/CheckBox";
import TerminateConfirmationModal from "./Modal";
// import Indeterminate from "../../../components/Indeterminate/Indeterminate";

const ManageTenants = (props) => {
    const { tenants, setTenants, onRefresh } = props;
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedAllUsers, setSelectedAllUsers] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [terminateModalOpen, setTerminateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const cbRef = useRef(null);
    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        setFilteredData(tenants);
    }, [tenants]);

    const handleSearch = (event) => {
        const keywords = event.target.value.toLowerCase();
        const newList = tenants.filter((data) => {
            const fullName = `${data.first_name} ${data.middle_name} ${data.last_name}`;
            return fullName.toLowerCase().includes(keywords);
        });
        setFilteredData(newList);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", options);
        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
        return `${formattedDate} | ${formattedTime}`;
    };

    const GenderToText = (gender) => {
        if (gender === 1) {
            return "Male";
        } else if (gender === 2) {
            return "Female";
        } else if (gender === 3) {
            return "Not to specify";
        } else {
            return "Unknown";
        }
    };

    const handleChange = (event) => {
        if (checked) {
            setSelectedUsers([]);
        } else {
            const allUserIds = tenants.map((user) => user.id);
            setSelectedUsers(allUserIds);
        }
        setSelectAllChecked(!selectAllChecked);
        setChecked(event.target.checked);
        console.log("Selected User IDs:", selectedUsers);
    };

    useEffect(() => {
        if (selectedUsers.length === filteredData.length && filteredData.length !== 0) {
            setChecked(true);
        } else {
            setChecked(false);
        }
        console.log(selectedUsers);
        console.log(filteredData);
    }, [selectedUsers, filteredData]);

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

    const handleTerminateConfirm = () => {
        if (selectedUsers.length > 0) {
            for (const userId of selectedUsers) {
                const terminate = async () => {
                    await sendRequest({
                        url: `http://127.0.0.1:8000/api/terminate-rentals/${userId}`,
                        method: "POST",
                    });
                };
                terminate();
                onRefresh();
                setSelectedUsers([]);

                // setChecked(false);
            }
        } else {
        }
        setTerminateModalOpen(false);
    };

    return (
        <div className={`${styles["main-container"]} `}>
            <div className={`${styles["search-box"]} `}>
                <SearchField
                    placeholder="Search"
                    onChange={handleSearch}
                ></SearchField>
            </div>

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
                        inputRef={cbRef}
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
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
                            <img
                                src={user.user.profile_picture_img}
                                alt="Renter"
                            />
                        </div>
                        <div className={`${styles["box-details"]} `}>
                            <p className={`${styles["box-details-name"]} `}>
                                {user.user.first_name} {user.user.middle_name}{" "}
                                {user.user.last_name}
                            </p>
                            <p className={`${styles["box-details-unit"]} `}>
                                {user.unit.name}
                            </p>

                            {/* <p className={`${styles["box-details-gender"]} `}>
                                {GenderToText(user.user.gender)}
                            </p> */}
                            <p className={`${styles["box-details-time"]} `}>
                                {formatDate(user.date_start)}
                            </p>
                        </div>{" "}
                        {showCheckboxes && (
                            <div className={`${styles["box-selected"]} `}>
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
                    <div className={`${styles["terminate-container-top"]} `}>
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
            <TerminateConfirmationModal
                open={terminateModalOpen}
                onClose={() => setTerminateModalOpen(false)}
                onTerminate={handleTerminateConfirm}
            />
        </div>
    );
};

export default ManageTenants;
