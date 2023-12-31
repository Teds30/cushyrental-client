import React from "react";
import Subscription from "./Subscription";

import styles from "./SubscriptionsList.module.css";

const SubscriptionsList = (props) => {
    const { userSubscriptions = [], onRefresh } = props;

    const content = userSubscriptions ? (
        userSubscriptions.map((subscription) => (
            <Subscription
                key={subscription.id}
                subscription={subscription}
                onRefresh={onRefresh}
            />
        ))
    ) : (
        <p style={{ textAlign: "center" }}>No results.</p>
    );
    return <div className={styles["container"]}>{content}</div>;
};

export default SubscriptionsList;
