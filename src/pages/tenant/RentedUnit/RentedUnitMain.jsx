import React, { useState, useEffect, useContext} from "react";
import { Link, navigate } from "react-router-dom";
import styles from "./RentedUnit.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import { FiChevronLeft } from "react-icons/fi";
import RentedUnitTabs from "./RentedUnitTabs";
import AuthContext from "../../../context/auth-context";

const RentedUnitMain = () => {
    const [rentedUnit, setRentedUnit] = useState([]);
    const authCtx = useContext(AuthContext);

    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format("MMMM DD, YYYY");
    };

    console.log(rentedUnit);
    // console.log(authCtx.user.id);
    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/tenant-rentals/${authCtx.user.id}`
                );
                const data = await response.json();
                setRentedUnit(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchRentals();
    }, []);

    return (
        <div className={`${styles["main-container"]} `} >
            <Box className={`${styles["top-back-container"]}}`}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "transparent",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: 'none',
                        borderBottom: '1px solid var(--border-color)',
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
                        <Box sx={{ marginLeft: '-22px' }} className={`${styles['manage-unit-title']}`}>
                            <p className="title">Rented Unit</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {rentedUnit.length !== 0 && (
                  <div >
                  <RentedUnitTabs rentedUnit={rentedUnit} />
              </div>
            )}
          
        </div>
    );
};

export default RentedUnitMain;
