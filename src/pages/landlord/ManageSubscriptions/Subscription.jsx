import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./Subscription.module.css";
import Status from "./Status";
import { WiTime4 } from "react-icons/wi";
import BorderedButton from "../../../components/Button/BorderedButton";
import useSubscriptionManager from "../../../hooks/data/subscriptions-hooks";
import SubscriptionImage from "./SubscriptionImage";

const Subscription = (props) => {
    const { subscription, onRefresh } = props;
    const { deleteUnitSubscription } = useSubscriptionManager();
    const [userSubscription, setUserSubscription] = useState();
    console.log(subscription);

    const now = moment();

    useEffect(() => {
        const onLoad = async () => {
            setUserSubscription(subscription);
        }
        onLoad();
    }, [subscription]);

    const cancelUnitRequestHandler = async (id) => {
        console.log(id);
        try {
            const res = await deleteUnitSubscription(id);
            onRefresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["row"]}>
                <div className="col1">
                    <div className={styles["image-container"]}>
                        <SubscriptionImage image={subscription.unit.image} />
                    </div>
                </div>
                <div className={styles["col2"]}>
                    <Status unitRequestStatus={subscription.request_status} />
                    <p className="title">{subscription.unit.name}</p>
                    <div>
                        <p>
                            Subscription:
                            <span className="title">
                                {" "}
                                {subscription.subscription.name.toUpperCase()}
                            </span>
                        </p>
                    </div>
                    {subscription.date_end &&
                        now <= moment(subscription.date_end) && (
                            <div
                                style={{
                                    marginTop: "10px",
                                    display: "flex",
                                }}
                            >
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <WiTime4
                                        style={{ fill: "var(--fc-body-light)" }}
                                    />
                                </span>
                                <p className="caption">
                                    Expiring{" "}
                                    {moment(subscription.date_end).fromNow()}
                                </p>
                            </div>
                        )}
                </div>
            </div>
            {subscription.request_status === 0 && (
                <div className={styles["row"]}>
                    <BorderedButton
                        btnType="danger"
                        width="100%"
                        onClick={() =>
                            cancelUnitRequestHandler(userSubscription.id)
                        }
                    >
                        Cancel
                    </BorderedButton>
                </div>
            )}
        </div>
    );
};

export default Subscription;
