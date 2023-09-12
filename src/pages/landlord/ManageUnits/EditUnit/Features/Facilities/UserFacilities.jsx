import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import useUnitManager from "../../../../../../hooks/data/units-hook";
import EditFacilities from "./EditFacilities";

import styles from "./EditFacilities.module.css";
import { FiChevronLeft } from "react-icons/fi";

const UserFacilities = () => {
    const { fetchUnitFacilities, isLoading } = useUnitManager();
    const { id } = useParams();

    const [unitFacilities, setUnitFacilities] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchUnitFacilities(id);
                console.log(res);
                setUnitFacilities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={styles["edit-feature-container"]}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar className={`${styles["toolbar-container"]}`}>
                        <Link
                            to={`/manage_unit/edit/${id}`}
                            className={`${styles["link-button"]}`}
                        >
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
                        <Box className={`${styles['edit-feature-title']}`}>
                            <p className="title">Facilities</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {!isLoading && unitFacilities.length ? (
                <EditFacilities unitFacilities={unitFacilities} />
            ) : (
                ""
            )}
        </div>
    );
};

export default UserFacilities;
