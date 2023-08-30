import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ManageRenters.module.css";

import SearchField from "../../../components/Search/SearchField";
import { FiChevronLeft } from "react-icons/fi";

const ManageRenters = () => {
  return (
    <div className={`${styles["main-container"]} `}>
      <div className={`${styles["top-back-container"]} `}>
        <Link to="/myunit-landlord">
          <div className={styles["back"]}>
            <FiChevronLeft size={24} /> <p>Manage Renters</p>
          </div>
        </Link>
      </div>

      <div className={styles["filter"]}>
        <div className={`${styles["filter-1"]} `}>
          <Link>
            <p className={styles["title"]}>Tenants</p>
          </Link>
        </div>

        <div className={`${styles["filter-2"]} `}>
          <Link>
            <p className={styles["title"]}>Pending Inquiries</p>
          </Link>
        </div>
      </div>

      <div className={`${styles["search-box"]} `}>
        <SearchField placeholder="Search an amenity">
          <input type="text" className="search-input" />
        </SearchField>
      </div>

      <div className={`${styles["tenants-main-box_container"]} `} id="tenants">
        <div className={`${styles["box-container"]} `}>
          <div className={`${styles["box-image"]} `}>
            <p>2</p>
          </div>
          <div className={`${styles["box-details"]} `}>
            <p className={`${styles["box-details-name"]} `}>
              Leonardo Dicaprio
            </p>
            <p className={`${styles["box-details-gender"]} `}>Male</p>
            <p className={`${styles["box-details-time"]} `}>
              18/04/2023 | 1:00 pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRenters;
