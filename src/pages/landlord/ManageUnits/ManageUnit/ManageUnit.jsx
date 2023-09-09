import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import styles from './ManageUnit.module.css';
import { FiChevronLeft } from "react-icons/fi";

const ManageUnit = () => {
    return (
        <div className={`${styles['manage-unit-container']}`}>
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
                    <Toolbar sx={{display: 'flex'}}>
                        <Link className={`${styles['link-button']}`}>
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
                        <Box className={`${styles['manage-unit-title']}`}>
                            <p className="title">Location</p>
                            <div className='pre-title'>3 Units</div>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <p>sdjfhisfg</p>
        </div>
    );
}

export default ManageUnit;