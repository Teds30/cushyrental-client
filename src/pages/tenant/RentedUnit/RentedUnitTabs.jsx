import { Link, navigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { FiChevronLeft } from "react-icons/fi";
import {
    StyledTabs,
    StyledTab,
    TabPanel,
} from "../../../components/Tabs/Tabs.jsx";

import styles from "./RentedUnitTabs.module.css";
import RentedUnitList from "./RentedUnitList.jsx";

const RentedUnitTabs = (props) => {
    const { rentedUnit, onRefresh } = props;

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
            <Box className={`${styles["top-back-container"]}}`}>
                <AppBar
                    position="fixed"
                    sx={{
                        margin: 0,
                        backgroundColor: "var(--bg-layer1)",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar className={`${styles["toolbar-container"]}`}>
                        <Link to={`/profile`}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "var(--fc-strong)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box
                            sx={{ marginLeft: "-22px" }}
                            className={`${styles["manage-unit-title"]}`}
                        >
                            <p className="title">Rented Unit</p>
                        </Box>
                    </Toolbar>
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
                                justifyContent: "center",
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
                                        <div
                                            className={`${styles["tab-child"]}`}
                                        >
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
                                        <div
                                            className={`${styles["tab-child"]}`}
                                        >
                                            Inactive
                                            <div>
                                                {rentedUnitInactive.length}
                                            </div>
                                        </div>
                                    )
                                }
                            />
                        </StyledTabs>
                    </Box>
                </AppBar>
            </Box>
            <Box sx={{ marginTop: "115px" }}>
                <TabPanel value={value} index={0}>
                    {rentedUnit.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: '300px', color: "var(--fc-body-light)" }}>No units available.</p>
                    ) : (
                        <RentedUnitList
                            rentedUnit={rentedUnit}
                            onRefresh={onRefresh}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {rentedUnit.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: '300px', color: "var(--fc-body-light)" }}>No units available.</p>
                    ) : (
                        <RentedUnitList
                            rentedUnit={rentedUnitActive}
                            onRefresh={onRefresh}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {rentedUnit.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: '300px', color: "var(--fc-body-light)" }}>No units available.</p>
                    ) : (
                        <RentedUnitList
                            rentedUnit={rentedUnitInactive}
                            onRefresh={onRefresh}
                        />
                    )}
                </TabPanel>
            </Box>
        </Fragment>
    );
};

export default RentedUnitTabs;
