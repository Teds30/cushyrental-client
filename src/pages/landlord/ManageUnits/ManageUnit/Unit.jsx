import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CardPlain from "../../../../components/Card/CardPlain";
import Status from "./Status";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderedButton from "../../../../components/Button/BorderedButton";
import useImageManager from "../../../../hooks/data/image-hook";
import useSubscriptionManager from "../../../../hooks/data/subscriptions-hooks";
import useUnitManager from "../../../../hooks/data/units-hook";

import styles from "./ManageUnit.module.css";
import photo from "../../../../assets/cushyrental.svg";
import { CiLocationOn } from "react-icons/ci";
import UnitImage from "./UnitImage";

const Unit = (props) => {
    const { user_unit: unitSubscriptions, onDeleteUnit } = props;
    // const { deleteUnitSubscription, isLoading } = useSubscriptionManager();
    const {deleteUnit, isLoading} = useUnitManager();
    const [userUnit, setUserUnit] = useState(unitSubscriptions);
    console.log(userUnit);

    // Dito na ako

    let gender;

    if (userUnit.target_gender === 1) {
        gender = "Male";
    } else if (userUnit.target_gender === 1) {
        gender = "Female";
    } else {
        gender = "All";
    }

    const cancelUnitRequestHandler = async () => {
        try {
            const res = await deleteUnit(userUnit.id);
            onDeleteUnit(userUnit.id);
        } catch(err) {}

    };

    const subscriptions = userUnit.subscriptions.filter((subscription) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 to the month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        if (
            subscription.date_start === null &&
            subscription.date_end === null &&
            subscription.request_status === 0
        ) {
            return subscription;
        } else if (
            formattedDate >= subscription.date_start.split(" ")[0] &&
            formattedDate <= subscription.date_end.split(" ")[0]
        ) {
            return subscription;
        } else if (subscription.request_status === 0) {
            return subscription;
        }
    });

    const requestStatus =
        userUnit.request_status === 0
            ? userUnit.request_status
            : userUnit.request_status === 2 && 3;

    const imageThumbnail = userUnit.images
        .filter((image, index) => image.is_thumbnail === 1)
        .shift();

    return (
        <div className={`${styles["units-container"]}`}>
            <CardPlain
                filled="false"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    borderRadius: "0",
                }}
            >
                <div className={`${styles["unit-col"]}`}>
                    <UnitImage
                        imageThumbnail={
                            imageThumbnail !== undefined
                                ? imageThumbnail
                                : userUnit.images[0]
                        }
                    />

                    <div className={`${styles["col-data"]}`}>
                        <div>
                            <Status
                                unitRequestStatus={
                                    requestStatus !== false
                                        ? requestStatus
                                        : userUnit.is_listed === 0
                                        ? 2
                                        : userUnit.is_listed
                                }
                            />
                        </div>
                        <div className="title">{userUnit.name}</div>
                        <div className={`${styles["col-address"]}`}>
                            <div>
                                <CiLocationOn />
                            </div>
                            <div className="caption">{userUnit.address}</div>
                        </div>
                        <div
                            className="title"
                            style={{ fontSize: "16px", color: "var(--accent)" }}
                        >
                            Php {userUnit.price}
                        </div>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["col-data-2"]}`}>
                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Rating</div>
                        <p className="title">{userUnit.average_ratings}</p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Available Slot</div>
                        <p className="title">{userUnit.slots}</p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Subscription</div>
                        <p className="title">
                            {subscriptions.length !== 0
                                ? subscriptions[0].subscription_id === 1
                                    ? "Bronze"
                                    : subscriptions[0].subscription_id === 2
                                    ? "Silver"
                                    : subscriptions[0].subscription_id === 3 &&
                                      "Gold"
                                : "None"}
                        </p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Target</div>
                        <p className="title">{gender}</p>
                    </div>
                </div>

                {userUnit.request_status === 0 ? ( <BorderedButton
                        width="100%"
                        btnType="danger"
                        onClick={cancelUnitRequestHandler}
                        isLoading={isLoading}
                        loadingText="Cancel Unit Request"
                    >
                        Cancel Unit Request
                    </BorderedButton>) : ( <div className={`${styles["unit-button"]}`}>
                        <Link
                            to={`/manage_unit/edit/${userUnit.id}`}
                            style={{ width: "100%" }}
                        >
                            <PrimaryButton width="100%">
                                Manage Unit
                            </PrimaryButton>
                        </Link>
                        <Link to="/subscriptions">
                            <BorderedButton disabled={subscriptions.length === 0 ? false : true}>Promote</BorderedButton>
                        </Link>
                    </div>)}
            </CardPlain>
        </div>
    );
};

export default Unit;
