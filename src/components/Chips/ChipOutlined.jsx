import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import styles from "./ChipButton.module.css";

const ChipOutlined = (props) => {
  const { items, button = "checkbox", clickable = true } = props;

  const [chips, setChips] = useState([]);

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
      setChips(id);
      props.onChipValue(id);
    }
  };

  const content = items.map((item) => {
    const attributesPath = "../../assets/attributes/";
    const icon = new URL(
      `${attributesPath}${item.icon.toLowerCase()}`,
      import.meta.url
    ).pathname;
    // I'll take note na you

    return (
      <Chip
        key={item.id}
        variant="outlined"
        icon={<img src={icon} alt={item.name} />}
        label={item.name}
        sx={{
          padding: "18px",
          fontWeight: "500",
          fontSize: "16px",
          background: chips.includes(item.id)
            ? "rgba(3, 176, 119, 0.08)"
            : "inherit",
          color: chips.includes(item.id) ? "var(--accent)" : "inherit",
          border: chips.includes(item.id)
            ? "1px solid var(--accent)"
            : "1px solid inherit",
          // '& img': {
          //   fill: chips.includes(item.id) ? 'var(--accent)' : '#8A93A6'
          // }
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

export default ChipOutlined;
