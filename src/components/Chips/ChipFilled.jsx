import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import useImageManager from "../../hooks/data/image-hook";

import styles from "./ChipButton.module.css";

const ChipFilled = (props) => {
    const {
        items: originalItems = [], // Rename originalItems to avoid conflicts
        button = "checkbox",
        clickable = true,
        selected = [],
    } = props;

    const { fetchIcon } = useImageManager();

    const [chips, setChips] = useState(selected.length !== 0 ? selected : []);
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

    const handleClick = (id) => {
        if (button === "checkbox") {
            if (chips.includes(id)) {
                setChips(chips.filter((chipId) => chipId !== id));
                props.onChipValue(chips.filter((chipId) => chipId !== id));
            } else {
                setChips([...chips, id]);
                props.onChipValue([...chips, id]);
            }
        } else {
            setChips([id]);
            props.onChipValue([id]);
        }
    };

    const content = items.map((item) => {
        return (
            <Chip
                key={item.id}
                icon={
                    <div
                        dangerouslySetInnerHTML={{
                            __html: item.icon,
                        }}
                    />
                }
                label={item.name}
                sx={{
                    padding: "8px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    justifyContent: "center",
                    fontWeight: "500",
                    fontSize: "16px",
                    background: chips.includes(item.id)
                        ? "rgba(3, 176, 119, 0.08)"
                        : "default",
                    color: chips.includes(item.id)
                        ? "var(--accent)"
                        : "inherit",
                    "& svg": {
                        fill: chips.includes(item.id)
                            ? "var(--accent)"
                            : "#8A93A6",
                            height: '16px',
                            width: '16px'
                    },
                    "& span": {
                        padding: "0",
                    },
                    "& MuiChip-icon": {
                        margin: "0",
                    },
                }}
                onClick={clickable ? () => handleClick(item.id) : undefined}
            />
        );
    });

    return (
        <Stack direction="row" spacing={1}>
            <div className={styles.chip}>{content}</div>
        </Stack>
    );
};

export default ChipFilled;
