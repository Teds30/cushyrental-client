import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./ManageRenters.module.css";
import SearchField from "../../../components/Search/SearchField";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import PrimaryButton from "../../../components/Button/BorderlessButton";
import CheckBox from "../../../components/CheckBox/CheckBox";

const ManageTenants = (props) => {
    const { tenants } = props;
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedAllUsers, setSelectedAllUsers] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

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

    const handleUserChecked = (id) => {
        setSelectedUsers(id);
    };

    const handleSelectAllChecked = () => {
        tenants.map((user) => {
            setSelectedUsers([{ ...selectedUsers, id: user.id }]);
        });
    };

    const handleToggleCheckboxes = () => {
        setShowCheckboxes(true);
    };

    const handleCancelClick = () => {
        setSelectedUsers([]);
        setShowCheckboxes(false);
        setSelectAllChecked(false);
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
                    <Link onClick={handleToggleCheckboxes}>Select</Link>
                </div>
            )}

            {showCheckboxes && (
                <div className={`${styles["selectall-container"]} `}>
                    <Link onClick={handleSelectAllChecked}>Select All</Link>
                </div>
            )}

            {filteredData.map((user) => (
                <div
                    key={user.id}
                    className={`${styles["tenants-main-box_container"]} `}
                    id={`user-${user.id}`}
                >
                    <div
                        className={`${styles["box-container"]} ${
                            showCheckboxes
                                ? styles["box-container-clicked"]
                                : ""
                        }`}
                    >
                        <div className={`${styles["box-image"]} `}>
                            <img src={user.profile_picture_img} alt="Renter" />
                        </div>
                        <div className={`${styles["box-details"]} `}>
                            <p className={`${styles["box-details-name"]} `}>
                                {user.first_name} {user.middle_name}{" "}
                                {user.last_name}
                            </p>
                            <p className={`${styles["box-details-gender"]} `}>
                                {GenderToText(user.gender)}
                            </p>
                            <p className={`${styles["box-details-time"]} `}>
                                {formatDate(user.created_at)}
                            </p>
                        </div>{" "}
                        {showCheckboxes && (
                            <div className={`${styles["box-selected"]} `}>
                                <CheckBox
                                    items={[{ id: user.id }]}
                                    selectedValue={selectedUsers}
                                    onCheckBox={handleUserChecked}
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
                    <div className={`${styles["terminate-container-bottom"]} `}>
                        <PrimaryButton width="100%" btnType="danger">
                            Terminate
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTenants;
