import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { StyledTabs, StyledTab, TabPanel } from "../../../components/Tabs/Tabs.jsx";

import styles from "./RentedUnitTabs.module.css";
import RentedUnitList from "./RentedUnitList.jsx";

const RentedUnitTabs = (props) => {
    const { rentedUnit } = props;

    // console.log(rentedUnit);
    const [value, setValue] = useState(0);
    const [rentedUnitActive, setRentedUnitActive] = useState([]);
    const [rentedUnitInactive, setRentedUnitInactive] = useState([]);

    const handleFilter = (req_status) => {
        const fil = rentedUnit.filter((rental) => {
            return rental.unit.request_status === req_status;
        });
        // console.log(fil)
        switch (req_status) {
            case 0:
                setRentedUnitInactive(fil);
            case 1:
                
                setRentedUnitActive(fil);
        }
    };

    useEffect(() => {
        handleFilter(0);
        handleFilter(1);
    }, [rentedUnit]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    background: "var(--bg-layer1)",
                }}
                className={`${styles["tab-container"]}`}
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    sx={{
                        justifyContent: 'center',
                         // Center align the tabs horizontally
                    }}
                >
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label="All"
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label={
                            rentedUnitActive.length === 0 ? (
                                "Active"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Active
                                    <div>{rentedUnitActive.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label={
                            rentedUnitInactive.length === 0 ? (
                                "Inactive"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Inactive
                                    <div>{rentedUnitInactive.length}</div>
                                </div>
                            )
                        }
                    />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                {rentedUnit.length === 0 ? (
                    <p style={{ textAlign: "center"}}>No results.</p>
                ) : (
                    <RentedUnitList rentedUnit={rentedUnit} />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {rentedUnit.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <RentedUnitList rentedUnit={rentedUnitActive} />
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {rentedUnit.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <RentedUnitList rentedUnit={rentedUnitInactive} />
                )}
            </TabPanel>
        </Fragment>
    );
};

export default RentedUnitTabs;
