import { Link, navigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
    StyledTabs,
    StyledTab,
    TabPanel,
} from "../../../components/Tabs/Tabs.jsx";

import styles from "./RentedUnitTabs.module.css";
import RentedUnitList from "./RentedUnitList.jsx";

const RentedUnitTabs = (props) => {
    const { rentedUnit = [], onRefresh } = props;

    console.log(rentedUnit);

    const [value, setValue] = useState(0);
    const [rentedUnitActive, setRentedUnitActive] = useState([]);
    const [rentedUnitInactive, setRentedUnitInactive] = useState([]);

    useEffect(() => {
        const activeUnits = rentedUnit.filter((unit) => unit.rental_status === 1);
        setRentedUnitActive(activeUnits);

        const inactiveUnits = rentedUnit.filter(
            (unit) => unit.rental_status !== 1
        );
        setRentedUnitInactive(inactiveUnits);
    }, [rentedUnit]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <Box
                sx={{
                    background: "var(--bg-layer1)",
                    marginTop: "60px",
                    "@media (max-width: 610px)": {
                        marginTop: "55px",
                    },
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
            <Box sx={{ marginTop: "110px" }}>
                <TabPanel value={value} index={0}>
                    {rentedUnit.length === 0 ? (
                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "300px",
                                color: "var(--fc-body-light)",
                            }}
                        >
                            No units available.
                        </p>
                    ) : (
                        <RentedUnitList
                            rentedUnit={rentedUnit}
                            onRefresh={onRefresh}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {rentedUnitActive.length === 0 ? (
                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "300px",
                                color: "var(--fc-body-light)",
                            }}
                        >
                            No units available.
                        </p>
                    ) : (
                        <RentedUnitList
                            rentedUnit={rentedUnitActive}
                            onRefresh={onRefresh}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {rentedUnitInactive.length === 0 ? (
                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "300px",
                                color: "var(--fc-body-light)",
                            }}
                        >
                            No units available.
                        </p>
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
