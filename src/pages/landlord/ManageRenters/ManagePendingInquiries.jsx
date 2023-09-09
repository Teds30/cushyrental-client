import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ManageRenters.module.css";
import SearchField from "../../../components/Search/SearchField";


const ManagePendingInquiries = (props) => {
    const { pendingInquiries } = props;
    const [filteredData, setFilteredData] = useState(pendingInquiries);
    const [rentalData, setRentalData] = useState(pendingInquiries);

    const handleSearch = (event) => {
        const keywords = event.target.value.toLowerCase();
        const newList = rentalData.filter((data) => {
            const fullName = `${data.user.first_name} ${data.user.middle_name} ${data.user.last_name}`;
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
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <div className={`${styles["main-container"]} `}>
            <div className={`${styles["search-box"]} `}>
                <SearchField
                    placeholder="Search"
                    onChange={handleSearch}
                ></SearchField>
            </div>

            {filteredData.map((user) => (
                <Link to={`/chats/${user.room._id}`} key={user.room._id}>
                    <div
                        className={`${styles["tenants-main-box_container"]} `}
                        id={`user-${user.user.id}`}
                    >
                        <div className={`${styles["box-container"]} `}>
                            <div className={`${styles["box-image"]} `}>
                                <img
                                    src={user.user.profile_picture_img}
                                    alt="Renter"
                                />
                            </div>
                            <div className={`${styles["box-details"]} `}>
                                <p className={`${styles["box-details-name"]} `}>
                                    {user.user.first_name}{" "}
                                    {user.user.middle_name}{" "}
                                    {user.user.last_name}
                                </p>
                                <p
                                    className={`${styles["box-details-gender"]} `}
                                >
                                    {GenderToText(user.user.gender)}
                                </p>
                                <p className={`${styles["box-details-time"]} `}>
                                    {formatDate(user.user.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ManagePendingInquiries;
