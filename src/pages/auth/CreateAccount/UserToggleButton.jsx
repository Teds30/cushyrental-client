import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function UserToggleButton(props) {
  const { onUserType } = props;
  const [alignment, setAlignment] = useState("tenant");

  const handleChange = (event, newAlignment) => {
    if (
      newAlignment === null &&
      (alignment === "tenant" || alignment === "landlord")
    ) {
      return;
    }

    setAlignment(newAlignment);
    onUserType({ user_type_id: newAlignment === "tenant" ? "1" : "2" });
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ fontSize: "18px", width: "100%" }}
    >
      <ToggleButton
        value="tenant"
        sx={{
          "&.MuiToggleButton-root.Mui-selected": {
            backgroundColor: "var(--accent)",
            borderRadius: "4px",
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
            color: "var(--bg-layer1)",
          },
          width: "100%",
          fontWeight: "600",
        }}
      >
        Tenant
      </ToggleButton>
      <ToggleButton
        value="landlord"
        sx={{
          "&.MuiToggleButton-root.Mui-selected": {
            backgroundColor: "var(--accent)",
            borderRadius: "4px",
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
            color: "var(--bg-layer1)",
          },
          width: "100%",
          fontWeight: "600",
        }}
      >
        Landlord
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
