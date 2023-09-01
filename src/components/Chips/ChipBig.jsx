import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import styles from './ChipButton.module.css';

const ChipBig = (props) => {
  const { items, button = 'checkbox', clickable = true, background = 'success', selected = [] } = props;

  const [ chips, setChips ] = useState([]);

  const handleClick = (id) => {
    if (button === "checkbox") {
      if (chips.includes(id)) {
        
        setChips(chips.filter(chipId => chipId !== id));
        props.onChipValue(chips.filter(chipId => chipId !== id))
      } else {
        
        setChips([...chips, id]);
        props.onChipValue([...chips, id]);
      }
    } else {
      setChips(id);
      props.onChipValue(id);
    }
  };

  const colorStyle = background === 'success' ? "var(--accent)" : "var(--accent-danger)";
  const borderShadowStyle = background === 'success' ? "0px 0px 0px 5px rgba(3, 176, 119, 0.20)" : "0px 0px 0px 5px rgba(235, 88, 88, 0.20)";

  useEffect(() => {
    setChips(selected.length !== 0 ? selected : []);
  }, [selected]);

  const content = items.map((item) => {

    const attributesPath = "../../assets/attributes/";
    const icon = new URL(
      `${attributesPath}${item.icon.toLowerCase()}`,
      import.meta.url
    ).pathname;

    return (
      <Chip
        key={item.id}
        variant="outlined"
        icon={<img src={icon} className={styles.chipImage} alt={item.name} />}
        label={item.name}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          width: "120px",
          fontWeight: "500",
          fontSize: "16px",
          background: chips.includes(item.id) ? colorStyle : "inherit",
          color: chips.includes(item.id) ? "var(--bg-layer1)" : "inherit",
          border: chips.includes(item.id)
            ? "1px solid " + colorStyle
            : "1px solid inherit",
          boxShadow: chips.includes(item.id)
            ? borderShadowStyle
            : "inherit",
          "& svg": {
            fill: chips.includes(item.id) ? "var(--bg-layer1)" : "#8A93A6",
            fontSize: '32px',
          },
          "&:hover": { // Add this to remove the hover effect
            background: chips.includes(item.id) && colorStyle,
            color: chips.includes(item.id) && colorStyle,
            border: chips.includes(item.id) ? "1px solid " + colorStyle : "1px solid inherit",
            "& img": {
              fill: chips.includes(item.id) ? colorStyle : "#8A93A6",
            },
          },
        }}
        onClick={clickable ? () => handleClick(item.id) : undefined}
      />
    );
  });

  return (
    <Stack direction="row" spacing={1}>
      <div className={styles.chip}>
      {content}
      </div>
    </Stack>
  );
}

export default ChipBig;