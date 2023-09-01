import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import styles from "./ChipButton.module.css";

const ChipDeletable = (props) => {
  const { items, button = "checkbox", clickable = true } = props;
  const [chipData, setChipData] = useState(items);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    props.onChipValue(chipData.filter((chip) => chip.id !== chipToDelete.id));
  };

  const content = chipData.map((item) => {
    const attributesPath = "../../assets/attributes/";
    const icon = new URL(
      `${attributesPath}${item.icon.toLowerCase()}`,
      import.meta.url
    ).pathname;
    // I'll take note na you

    return (
      <Chip
        key={item.id}
        icon={<img src={icon} alt={item.name} />}
        label={item.name}
        sx={{
          padding: "18px 12px 18px 18px",
          fontWeight: "500",
          fontSize: "16px",
          background: "default",
          color: "inherit",
          // "& svg": {
          //   fill: "#8A93A6",
          // },
        }}
        onDelete={handleDelete(item)}
      />
    );
  });

  return (
    <Stack direction="row" spacing={1}>
      <div className={styles.chip}>{content}</div>
    </Stack>
  );
};

export default ChipDeletable;
