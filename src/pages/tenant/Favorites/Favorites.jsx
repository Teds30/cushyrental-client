import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Favorites.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import { PiHouseFill, PiHouseLight } from "react-icons/pi";

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { TbMapPin } from "react-icons/tb";
import { BiMessageAlt } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import FavoritesUnitRating from "./FavoritesUnitRating";
import FavoritesImage from "./FavoritesImage";
import useBookmark from "../../../hooks/data/bookmark-hook";
import AuthContext from "../../../context/auth-context";
import Status from "./FavoritesStatus";

const Favorites = () => {
    const [units, setUnits] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState([]);
    const { fetchBookmarkUnits, addToBookmark, isLoading } = useBookmark();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    // console.log(authCtx);

    console.log(units);
    // console.log(isBookmarked);

    // console.log(fetchImage);
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchBookmarkUnits(authCtx.user.id);
                // const data = await response.json();
                // console.log(authCtx.user.id)
                // console.log(response);
                setUnits(response);
            } catch (error) {
                console.error("Error fetching units:", error);
            }
        };
        if (authCtx.user) loadData();
    }, [authCtx.user]);

    const handleBookmarkClick = async (id) => {
        const body = { unit_id: id, user_id: authCtx.user.id };
        console.log(body);

        const res = await addToBookmark(body);
        setUnits(res);
    };

    const unitHandler = (id) => {
        navigate(`/unit/${id}`);
    };

    return (
        <div className={`${styles["main-container"]} `}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
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
                            className={`${styles["favorites-title"]}`}
                        >
                            <p className="title">Favorites</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["padding-top-container"]} `}>
                {units && units.map((units) => (
                    <div
                        key={units.id}
                        className={`${styles["main-unit-container"]} `}
                        id={`user-${units.id}`}
                        
                    >
                        <div className={`${styles["image-container"]} `} onClick={() => unitHandler(units.id)}>
                            <FavoritesImage images={units.images.filter(image => image.is_thumbnail === 1).shift()} />
                            <div
                                className={`${styles["unit-gallery-container"]} `}
                            >
                                <GrGallery
                                    style={{
                                        height: "14px",
                                        width: "14px",
                                        fill: "var(--border-color)",
                                    }}
                                />
                                <p className="smaller-text">
                                    {units.images.length}
                                </p>
                            </div>
                        </div>
                        <div className={`${styles["side-unit-container"]} `}>
                            <div className={`${styles["content-container"]} `} >
                                <div className={`${styles["text-container"]} `} onClick={() => unitHandler(units.id)}>
                                    <p
                                        className={`${styles["bname-container"]} `}
                                    >
                                        {units.name}
                                    </p>
                                    <FavoritesUnitRating
                                        average_ratings={units.average_ratings}
                                    />
                                    <p
                                        className={`${styles["price-container"]} `}
                                    >
                                        Php {units.price}
                                    </p>
                                    <p
                                        className={`${styles["address-container"]} `}
                                    >
                                        <TbMapPin
                                            style={{
                                                fill: "transparent",
                                                paddingRight: "3px",
                                                // marginTop: "-2px",
                                            }}
                                            size={14}
                                        />
                                        {units.address}
                                    </p>
                                </div>
                                <div
                                    className={`${styles["bookmark-container"]}`}
                                >
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={() =>
                                            handleBookmarkClick(units.id)
                                        }
                                    >
                                        {isBookmarked.includes(units.id) ? (
                                            <BsBookmark
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                                color: "var(--fc-strong)",
                                                fill: "var(--fc-body)",
                                            }}
                                        />
                                        ) : (

                                            <BsBookmarkFill
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                                color: "var(--fc-strong)",
                                                fill: "var(--accent)",
                                            }}
                                        />
                                        )}
                                    </IconButton>
                                </div>
                            </div>
                            <div className={`${styles["button-container"]}`}>
                                <Link to="">
                                    <div
                                        className={`${styles["button-compare"]}`}
                                    >
                                        <PiHouseLight
                                            style={{ fill: "var(--accent)", marginTop: "2px"}}
                                            size={16}
                                        />{" "}
                                        <p>Compare</p>
                                    </div>
                                </Link>

                                <Link to="">
                                    <button
                                        className={`${styles["button-message"]}`}
                                    >
                                        {" "}
                                        <BiMessageAlt
                                            style={{ fill: "var(--accent)" }}
                                            size={20}
                                        />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${styles["button-add-container"]}`}>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <Fab
                        sx={{ backgroundColor: "var(--accent)" }}
                        aria-label="add"
                    >
                        <PiHouseLight style={{ fill: "white" }} size={24} />
                    </Fab>
                </Box>
            </div>
        </div>
    );
    // return (
    //     <div>asd</div>
    // )
};

export default Favorites;
