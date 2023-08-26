import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const Warning = (props) => {
    const { warning = '' } = props;

    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="warning">
            {warning}
          </Alert>
        </Stack>
    );
};

export default Warning