import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import UnitPhoto from "./UnitPhoto";
import CardShadow from "../../../components/Card/CardShadow";
import ChipBig from "../../../components/Chips/ChipBig";
import BorderlessButton from "../../../components/Button/BorderlessButton";

import styles from "./ViewUnitDetails.module.css";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

const genders = [
    {
        id: "1",
        name: "Male",
        icon: "male.svg",
    },
    {
        id: "2",
        name: "Female",
        icon: "female.svg",
    },
    {
        id: "3",
        name: "Both",
        icon: "both.svg",
    },
];

const UnitDetails = (props) => {
    const { unit } = props;

    const [gender, setGender] = useState(
        unit.gender === 1 ? "Male" : unit.gender === 2 ? "Female" : "Both"
    );
    const [readMore, setReadMore] = useState(true);

    const readMoreChangeHandler = () => {
        setReadMore(prevReadMore => !prevReadMore);
    };

    return (
        <div className={`${styles["unit-details-main"]}`}>
            <div className={`${styles["unit-photo"]}`}>
                <UnitPhoto images={unit.images} />
            </div>

            <div className={`${styles["unit-details-row"]}`}>
                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <div className={styles.price}>
                            <p className="title">PHP {unit.price} </p>
                            <p
                                className="smaller-text"
                                style={{
                                    fontSize: "10px",
                                    marginTop: "5px",
                                    fontWeight: "600",
                                }}
                            >
                                {" "}
                                / MONTH
                            </p>
                        </div>
                        <p className={styles.details}>{unit.name}</p>
                        <div className={styles.ratings}>
                            <Rating
                                name="disabled"
                                value={unit.average_ratings}
                                disabled
                                sx={{ color: "var(--accent)" }}
                            />
                            <p>{unit.average_ratings.toFixed(1)}</p>
                            <div className={`${styles["vertical-line"]}`}></div>
                            <p>{unit.slots}</p>
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <div className={styles.location}>
                            <div className={styles.address}>
                                <CiLocationOn
                                    size={16}
                                    style={{ color: "var(--fc-body)" }}
                                />
                                <p
                                    className="title"
                                    style={{
                                        color: "var(--fc-body)",
                                        fontWeight: "400",
                                    }}
                                >
                                    {unit.address}
                                </p>
                            </div>
                            <Link style={{ color: "var(--accent)" }}>
                                View on Map
                            </Link>
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <div className={styles.location}>
                            <p className="title">Target Tenant</p>
                            <ChipBig
                                items={genders.filter(
                                    (tenantGender) =>
                                        tenantGender.name === gender
                                )}
                                clickable={false}
                            />
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div
                        className={`${styles["unit-detials-col"]}`}
                        style={{ textAlign: "justify" }}
                    >
                        <p className="title">Details</p>
                        <p className="caption" style={{ textIndent: "4%" }}>
                            {readMore === true
                                ? unit.details
                                : unit.details.substring(0, 300) + "..."}
                        </p>
                        <div>
                            {/* Use onClick instead of onChange */}
                            <BorderlessButton
                                onClick={readMoreChangeHandler}
                            >
                                Read More
                            </BorderlessButton>
                        </div>
                    </div>
                </CardShadow>
            </div>
        </div>
    );
};

export default UnitDetails;
