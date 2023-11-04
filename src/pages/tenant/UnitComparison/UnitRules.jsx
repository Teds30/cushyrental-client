import React, { useEffect, useState, Fragment } from "react";

import useImageManager from "../../../hooks/data/image-hook";

import styles from "./UnitComparison.module.css";

const UnitRules = (props) => {
    const { items: originalItems = [] } = props;

    const { fetchIcon } = useImageManager();

    const [items, setItems] = useState([]); // Use state for items

    useEffect(() => {
        const fetchIcons = async () => {
            const iconPromises = originalItems.map(async (item) => {
                try {
                    const res = await fetchIcon(item.icon);
                    return {
                        ...item,
                        icon: res,
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            });

            const newItems = await Promise.all(iconPromises);
            setItems(newItems); // Update items using state
        };

        fetchIcons();
    }, [originalItems, fetchIcon]);

    const content = items.map((item) => (
        <div key={item.id} className={`${styles["rules"]}`}>
            <div
                className={`${styles["rules-icon"]}`}
                dangerouslySetInnerHTML={{
                    __html: item.icon,
                }}
            />
            <p className={`${styles["rule-name"]}`}>{item.name}</p>
        </div>
    ));

    return <div className={`${styles["rules-content"]}`}>{content}</div>;
};

export default UnitRules;