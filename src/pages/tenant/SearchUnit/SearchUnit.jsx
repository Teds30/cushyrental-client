import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { StyledTabs, StyledTab, TabPanel } from "../../../components/Tabs/Tabs";
import Location from "./Location";
import useAttributeManager from "../../../hooks/data/attribute-hook";

import styles from "./SearchUnit.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Filter from "./Filter";

const SearchUnit = () => {
    const { fetchAttributes, isLoading } = useAttributeManager();
    const [value, setValue] = useState(0);
    const [attribtes, setAttributes] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const closeSearchHandler = () => {
        // code here...
    };

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const res = await fetchAttributes();
                setAttributes(res);
            } catch (error) {
            }
        };

        fetchImagesData();
    }, []);

    const style = {
        textTransform: "none",
        fontWeight: "700",
        fontSize: "16px",
    };

    return (
        !isLoading &&
        attribtes.length !== 0 && (
            <div className={`${styles["search-container"]}`}>
                <Box
                    className={`${styles["search-nav"]}`}
                    sx={{
                        // borderBottom: 1,
                        borderColor: "divider",
                        background: "var(--bg-layer1)",
                    }}
                >
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <StyledTab disableRipple sx={style} label="Location" />

                        <StyledTab disableRipple sx={style} label="Filter" />
                    </StyledTabs>

                    <div className={`${styles["close-button"]}`}>
                        <IconButton
                            aria-label="delete"
                            onClick={closeSearchHandler}
                        >
                            <CancelIcon
                                sx={{
                                    filter: "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))",
                                    fill: "var(--bg-layer1)",
                                }}
                            />
                        </IconButton>
                    </div>
                </Box>
                <TabPanel value={value} index={0}>
                    <Location />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Filter attributes={attribtes}/>
                </TabPanel>
            </div>
        )
    );
};

export default SearchUnit;
