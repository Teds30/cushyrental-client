import React from "react";
import { Link } from "react-router-dom";

import styles from "../../landlord/MyUnit/MyUnit.module.css";

import { FiChevronLeft } from "react-icons/fi";

const MyUnit = () => {
  return (
    <div>
      <div className={`${styles["header-container"]} `}>
        <div className={styles["header"]}>
          <FiChevronLeft size={24} /> <p>My Unit</p>
        </div>
      </div>

      <div className={`${styles["background-img_container"]} `}>
        <div className={`${styles["background-img-top"]} `}></div>
        <div className={`${styles["background-img-1"]} `}>
          <svg
            viewBox="0 0 360 190"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H360.327C360.327 0 406.841 110.249 360.327 164.865C285.814 252.359 0 76.2097 0 164.865C0 253.52 0 0 0 0Z"
              fill="#1D6156"
            />
          </svg>
        </div>
      </div>

      <div className={`${styles["main-box_container"]} `}>
        <Link
          to="/managerenters"
          className={`${styles["btn-link box-1_container"]} `}
        >
          <div className="box-1">
            <svg
              width="55"
              height="54"
              viewBox="0 0 55 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
            <p>MANAGE RENTERS</p>
          </div>
        </Link>

        <a
          href="../../landlord/pages/manage_units.php"
          className="btn-link box-2_container"
        >
          <div className="box-2">
            <svg
              width="55"
              height="54"
              viewBox="0 0 55 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
            <p>MANAGE UNITS</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MyUnit;
