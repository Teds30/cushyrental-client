import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import PrimaryButton from '../../../../../components/Button/PrimaryButton';
import SearchField from '../../../../../components/Search/SearchField';

import styles from '../CreateUnit.module.css';
import photo from '../../../../../assets/Units/pics.png';
import { FiChevronLeft } from "react-icons/fi";

const Location = (props) => {
    const saveHandler = (event) => {
        event.preventDefault();

        // save
    }

    return (
        <div className={`${styles['location-container']}`}>
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
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Link>
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
                        <Box>
                            <p className="title">Manage Renters</p>
                        </Box>
                        <PrimaryButton onClick={saveHandler}>Save</PrimaryButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <div style={{padding: '0 10px'}}>
                <SearchField placeholder='Search' />
            </div>

            <div className={`${styles['location-map']}`}>
                   <img src={photo} alt="CushyRental" />                 
            </div>
        </div>
    );
};

export default Location;
