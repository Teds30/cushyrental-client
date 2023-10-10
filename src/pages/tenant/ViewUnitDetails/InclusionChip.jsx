import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

export default function InclusionChip(props) {
    const { inclusions } = props;

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                icon={<div
                    dangerouslySetInnerHTML={{
                        __html: inclusions[0].icon,
                    }}
                />}
                label={inclusions[0].name}
                variant="outlined"
                sx={{
                    padding: "10px 3px",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '16px',
                    gap: '9px',
                    "& span": {
                        padding: "0 4px 0 0",
                        fontSize: "8px",
                        color: "#8A93A6",
                    },
                    "& svg": {
                        height: "7px",
                        width: "7px",
                        fill: "var(--fc-body)",
                        background: '#D9D9D9',
                        padding: '2px',
                        borderRadius: '50%'
                    }, "& MuiChip-icon": {
                        padding: '0',
                        margin: '0 0 0 0'
                    }
                }}
            />
        </Stack>
    );
}