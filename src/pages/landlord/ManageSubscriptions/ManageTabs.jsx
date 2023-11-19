import { Link } from "react-router-dom";
import { Fragment, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import {
    StyledTabs,
    StyledTab,
    TabPanel,
} from "../../../components/Tabs/Tabs.jsx";

import styles from "./ManageTabs.module.css";
import SubscriptionsList from "./SubscriptionsList.jsx";
import AuthContext from "../../../context/auth-context";
import useSubscriptionManager from "../../../hooks/data/subscriptions-hooks";

const ManageTabs = (props) => {
    const authCtx = useContext(AuthContext);
    const { userSubscriptions = [], setUserSubscriptions} = props;
    const { fetchUserSubscriptions, isLoading } = useSubscriptionManager();

    const [value, setValue] = useState(0);
    const [subscriptionPending, setSubscriptionPending] = useState([]);
    const [subscriptionActive, setSubscriptionActive] = useState([]);
    const [subscriptionDenied, setSubscriptionDenied] = useState([]);
    const [subscriptionCompleted, setSubscriptionCompleted] = useState([]);

    const handleFetch = async () => {
        try {
            const res = await fetchUserSubscriptions(authCtx.user.id);
            setUserSubscriptions(res);
        } catch (err) {}
    };

    useEffect(() => {
        if (authCtx.user) handleFetch();
    }, [authCtx.user]);

    console.log(subscriptionPending);
    const handleFilter = (req_status) => {
        const fil = userSubscriptions.filter((unit) => {
            return unit.request_status === req_status;
        });

        switch (req_status) {
            case 0:
                setSubscriptionPending(fil);
            case 1:
                setSubscriptionActive(fil);
            case 2:
                setSubscriptionDenied(fil);
            case 3:
                setSubscriptionCompleted(fil);
        }
    };
    useEffect(() => {
        handleFilter(0);
        handleFilter(1);
        handleFilter(2);
        handleFilter(3);
    }, [userSubscriptions]);

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
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
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
                            subscriptionPending.length === 0 ? (
                                "Pending"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Pending
                                    <div>{subscriptionPending.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label={
                            subscriptionActive.length === 0 ? (
                                "Active"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Active
                                    <div>{subscriptionActive.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label={
                            subscriptionDenied.length === 0 ? (
                                "Denied"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Denied
                                    <div>{subscriptionDenied.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: "none" }}
                        label={
                            subscriptionCompleted.length === 0 ? (
                                "Completed"
                            ) : (
                                <div className={`${styles["tab-child"]}`}>
                                    Completed
                                    <div>{subscriptionCompleted.length}</div>
                                </div>
                            )
                        }
                    />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                {userSubscriptions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <SubscriptionsList
                        userSubscriptions={userSubscriptions}
                        onRefresh={handleFetch}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {userSubscriptions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <SubscriptionsList
                        userSubscriptions={subscriptionPending}
                        onRefresh={handleFetch}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {userSubscriptions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <SubscriptionsList
                        userSubscriptions={subscriptionActive}
                        onRefresh={handleFetch}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {userSubscriptions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <SubscriptionsList
                        userSubscriptions={subscriptionDenied}
                        onRefresh={handleFetch}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {userSubscriptions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No results.</p>
                ) : (
                    <SubscriptionsList
                        userSubscriptions={subscriptionCompleted}
                        onRefresh={handleFetch}
                    />
                )}
            </TabPanel>
        </Fragment>
    );
};

export default ManageTabs;
