import { Link } from "react-router-dom";

import CardPlain from "../../../../components/Card/CardPlain";

import styles from "./EditUnit.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Fragment } from "react";

const features = [
    {
        feature: "Amenities",
        fill: "#9B50D6",
    },
    {
        feature: "Amenities",
        fill: "#5075D6",
    },
    {
        feature: "Amenities",
        fill: "#50D6BD",
    },
    {
        feature: "Amenities",
        fill: "#D65050;",
    },
];

const UnitFeatures = (props) => {
    const { id } = props

    return (
        <div className={`${styles["feature-container"]}`}>
            <p className={`${styles["unit-details-title"]}`}>Features</p>
            <CardPlain filled={"false"}>
                <div className={`${styles["feature-style"]}`}>
                    <Link to={`/manage_unit/edit/amenities/${id}`} className={`${styles["feature-style-col"]}`}>
                        <div className={`${styles["attribute"]}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="4"
                                    fill="#9B50D6"
                                />
                                <path
                                    d="M6 15.3333C6 14.9797 6.14048 14.6406 6.39052 14.3905C6.64057 14.1405 6.97971 14 7.33333 14H8.66667C9.02029 14 9.35943 14.1405 9.60948 14.3905C9.85952 14.6406 10 14.9797 10 15.3333V16.6667C10 17.0203 9.85952 17.3594 9.60948 17.6095C9.35943 17.8595 9.02029 18 8.66667 18H7.33333C6.97971 18 6.64057 17.8595 6.39052 17.6095C6.14048 17.3594 6 17.0203 6 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 15.3333C14 14.9797 14.1405 14.6406 14.3905 14.3905C14.6406 14.1405 14.9797 14 15.3333 14H16.6667C17.0203 14 17.3594 14.1405 17.6095 14.3905C17.8595 14.6406 18 14.9797 18 15.3333V16.6667C18 17.0203 17.8595 17.3594 17.6095 17.6095C17.3594 17.8595 17.0203 18 16.6667 18H15.3333C14.9797 18 14.6406 17.8595 14.3905 17.6095C14.1405 17.3594 14 17.0203 14 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 7.33333C10 6.97971 10.1405 6.64057 10.3905 6.39052C10.6406 6.14048 10.9797 6 11.3333 6H12.6667C13.0203 6 13.3594 6.14048 13.6095 6.39052C13.8595 6.64057 14 6.97971 14 7.33333V8.66667C14 9.02029 13.8595 9.35943 13.6095 9.60948C13.3594 9.85952 13.0203 10 12.6667 10H11.3333C10.9797 10 10.6406 9.85952 10.3905 9.60948C10.1405 9.35943 10 9.02029 10 8.66667V7.33333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 14V13.3333C8 12.9797 8.14048 12.6406 8.39052 12.3905C8.64057 12.1405 8.97971 12 9.33333 12H14.6667C15.0203 12 15.3594 12.1405 15.6095 12.3905C15.8595 12.6406 16 12.9797 16 13.3333V14"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 10V12"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>Amenity</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles["hr"]}></div>

                    <Link to={`/manage_unit/edit/facilities/${id}`} className={`${styles["feature-style-col"]}`}>
                        <div className={`${styles["attribute"]}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="4"
                                    fill="#5075D6"
                                />
                                <path
                                    d="M6 15.3333C6 14.9797 6.14048 14.6406 6.39052 14.3905C6.64057 14.1405 6.97971 14 7.33333 14H8.66667C9.02029 14 9.35943 14.1405 9.60948 14.3905C9.85952 14.6406 10 14.9797 10 15.3333V16.6667C10 17.0203 9.85952 17.3594 9.60948 17.6095C9.35943 17.8595 9.02029 18 8.66667 18H7.33333C6.97971 18 6.64057 17.8595 6.39052 17.6095C6.14048 17.3594 6 17.0203 6 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 15.3333C14 14.9797 14.1405 14.6406 14.3905 14.3905C14.6406 14.1405 14.9797 14 15.3333 14H16.6667C17.0203 14 17.3594 14.1405 17.6095 14.3905C17.8595 14.6406 18 14.9797 18 15.3333V16.6667C18 17.0203 17.8595 17.3594 17.6095 17.6095C17.3594 17.8595 17.0203 18 16.6667 18H15.3333C14.9797 18 14.6406 17.8595 14.3905 17.6095C14.1405 17.3594 14 17.0203 14 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 7.33333C10 6.97971 10.1405 6.64057 10.3905 6.39052C10.6406 6.14048 10.9797 6 11.3333 6H12.6667C13.0203 6 13.3594 6.14048 13.6095 6.39052C13.8595 6.64057 14 6.97971 14 7.33333V8.66667C14 9.02029 13.8595 9.35943 13.6095 9.60948C13.3594 9.85952 13.0203 10 12.6667 10H11.3333C10.9797 10 10.6406 9.85952 10.3905 9.60948C10.1405 9.35943 10 9.02029 10 8.66667V7.33333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 14V13.3333C8 12.9797 8.14048 12.6406 8.39052 12.3905C8.64057 12.1405 8.97971 12 9.33333 12H14.6667C15.0203 12 15.3594 12.1405 15.6095 12.3905C15.8595 12.6406 16 12.9797 16 13.3333V14"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 10V12"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>Facilities</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles["hr"]}></div>

                    <Link to={`/manage_unit/edit/inclusions/${id}`} className={`${styles["feature-style-col"]}`}>
                        <div className={`${styles["attribute"]}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="4"
                                    fill="#50D6BD"
                                />
                                <path
                                    d="M6 15.3333C6 14.9797 6.14048 14.6406 6.39052 14.3905C6.64057 14.1405 6.97971 14 7.33333 14H8.66667C9.02029 14 9.35943 14.1405 9.60948 14.3905C9.85952 14.6406 10 14.9797 10 15.3333V16.6667C10 17.0203 9.85952 17.3594 9.60948 17.6095C9.35943 17.8595 9.02029 18 8.66667 18H7.33333C6.97971 18 6.64057 17.8595 6.39052 17.6095C6.14048 17.3594 6 17.0203 6 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 15.3333C14 14.9797 14.1405 14.6406 14.3905 14.3905C14.6406 14.1405 14.9797 14 15.3333 14H16.6667C17.0203 14 17.3594 14.1405 17.6095 14.3905C17.8595 14.6406 18 14.9797 18 15.3333V16.6667C18 17.0203 17.8595 17.3594 17.6095 17.6095C17.3594 17.8595 17.0203 18 16.6667 18H15.3333C14.9797 18 14.6406 17.8595 14.3905 17.6095C14.1405 17.3594 14 17.0203 14 16.6667V15.3333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 7.33333C10 6.97971 10.1405 6.64057 10.3905 6.39052C10.6406 6.14048 10.9797 6 11.3333 6H12.6667C13.0203 6 13.3594 6.14048 13.6095 6.39052C13.8595 6.64057 14 6.97971 14 7.33333V8.66667C14 9.02029 13.8595 9.35943 13.6095 9.60948C13.3594 9.85952 13.0203 10 12.6667 10H11.3333C10.9797 10 10.6406 9.85952 10.3905 9.60948C10.1405 9.35943 10 9.02029 10 8.66667V7.33333Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 14V13.3333C8 12.9797 8.14048 12.6406 8.39052 12.3905C8.64057 12.1405 8.97971 12 9.33333 12H14.6667C15.0203 12 15.3594 12.1405 15.6095 12.3905C15.8595 12.6406 16 12.9797 16 13.3333V14"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 10V12"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>Inclusions</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles["hr"]}></div>

                    <Link to={`/manage_unit/edit/rules/${id}`} className={`${styles["feature-style-col"]}`}>
                        <div className={`${styles["attribute"]}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="4"
                                    fill="#D65050"
                                />
                                <path
                                    d="M12 8.66436C11.6464 8.66436 11.3072 8.52401 11.0572 8.27418C10.8071 8.02435 10.6667 7.6855 10.6667 7.33218C10.6667 6.97887 10.8071 6.64002 11.0572 6.39019C11.3072 6.14035 11.6464 6 12 6C12.3536 6 12.6928 6.14035 12.9428 6.39019C13.1929 6.64002 13.3333 6.97887 13.3333 7.33218C13.3333 7.6855 13.1929 8.02435 12.9428 8.27418C12.6928 8.52401 12.3536 8.66436 12 8.66436ZM12 8.66436V9.33046M15.7133 15.7263C15.4634 15.9762 15.3231 16.3152 15.3233 16.6685C15.3235 17.0218 15.4641 17.3606 15.7143 17.6103C15.9645 17.86 16.3037 18.0002 16.6574 18C17.011 17.9998 17.3501 17.8593 17.6 17.6093M11.4087 11.4173C11.0785 11.5195 10.7805 11.7055 10.5436 11.957C10.3068 12.2086 10.1393 12.5172 10.0574 12.8528C9.97554 13.1883 9.98209 13.5393 10.0764 13.8715C10.1708 14.2038 10.3497 14.5059 10.5958 14.7485C10.8418 14.9911 11.1466 15.1658 11.4804 15.2556C11.8141 15.3454 12.1655 15.3473 12.5002 15.261C12.8349 15.1747 13.1415 15.0032 13.3901 14.7633C13.6387 14.5233 13.8208 14.2231 13.9187 13.8918M8.46667 15.8581L10.3333 14.526M15.5333 15.8581L13.6667 14.526M6 6L18 17.9896M6 16.6575C6 17.0108 6.14048 17.3496 6.39052 17.5995C6.64057 17.8493 6.97971 17.9896 7.33333 17.9896C7.68696 17.9896 8.02609 17.8493 8.27614 17.5995C8.52619 17.3496 8.66667 17.0108 8.66667 16.6575C8.66667 16.3041 8.52619 15.9653 8.27614 15.7155C8.02609 15.4656 7.68696 15.3253 7.33333 15.3253C6.97971 15.3253 6.64057 15.4656 6.39052 15.7155C6.14048 15.9653 6 16.3041 6 16.6575Z"
                                    stroke="#FBFBFC"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>Rules</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>
                </div>
            </CardPlain>
        </div>
    );
};

export default UnitFeatures;
