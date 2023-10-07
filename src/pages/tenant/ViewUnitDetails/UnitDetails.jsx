import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import UnitPhoto from "./UnitPhoto";
import CardShadow from "../../../components/Card/CardShadow";
import ChipBig from "../../../components/Chips/ChipBig";
import BorderlessButton from "../../../components/Button/BorderlessButton";
import Facilities from "./Facilities";

import styles from "./ViewUnitDetails.module.css";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import Amenities from "./Amenities";
import Rules from "./Rules";
import PaymentAndInclusion from "./PaymentsAndInclusion";

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
    const [readMore, setReadMore] = useState(false);

    const readMoreChangeHandler = () => {
        setReadMore((prevReadMore) => !prevReadMore);
    };

    console.log(unit);

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
                                value={0}
                                disabled
                                sx={{
                                    color: "var(--accent)",
                                    "& svg": {
                                        fill: "var(--accent)",
                                    },
                                }}
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
                            <BorderlessButton onClick={readMoreChangeHandler}>
                                Read More
                            </BorderlessButton>
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <p className="title">Amenities</p>

                        <Amenities amenities={unit.amenities} />
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <p className="title">Facilities</p>

                        <Facilities facilities={unit.facilities} />
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <p className="title">Rules</p>

                        <Rules rules={unit.rules} />
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles["unit-detials-col"]}`}>
                        <p className="title">Payment & Inclusions</p>

                        <PaymentAndInclusion
                            paymentAndInclusions={{
                                month_advance: unit.month_advance,
                                month_deposit: unit.month_deposit,
                                inclusions: unit.inclusions,
                            }}
                        />
                    </div>
                </CardShadow>
            </div>
        </div>
    );
};

export default UnitDetails;
