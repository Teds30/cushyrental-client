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
import useHttp from "../../../hooks/http-hook";

const Favorites = () => {
    const [units, setUnits] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState([]);
    const { fetchBookmarkUnits, addToBookmark, isLoading } = useBookmark();
    const { sendRequest } = useHttp();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    console.log(units);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchBookmarkUnits(authCtx.user.id);
                setUnits(response);
                // console.log(response);
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

    const sortedUnits = [...units].sort((a, b) => {
        if (
            (a.slots === null || a.slots === 0) &&
            b.slots !== null &&
            b.slots !== 0
        ) {
            return 1;
        } else if (
            (b.slots === null || b.slots === 0) &&
            a.slots !== null &&
            a.slots !== 0
        ) {
            return -1;
        } else {
            return (
                new Date(b.bookmark.created_at) -
                new Date(a.bookmark.created_at)
            );
        }
    });

    const handleInquire = async (id) => {
        // SOON: ALLOW NON-AUTHENTICATED USER
        try {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_CHAT_LOCALHOST
                }/find-existing-room/${id}/${authCtx.user.id}`,
            });

            if (res) {
                navigate(`/chats/${res._id}`);
                return;
            }

            const newRoom = await sendRequest({
                url: `${import.meta.env.VITE_CHAT_LOCALHOST}/new-room`,
                method: "POST",
                body: JSON.stringify({
                    name: unitData.name,
                    unit_id: id,
                    landlord_id: unitData.landlord_id,
                    tenant_id: authCtx.user.id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (newRoom) {
                navigate(`/chats/${newRoom._id}`);
            }
        } catch (err) {
            console.log(err);
        }
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
                {units &&
                    units.map((units) => {
                        const imageThumbnail = units.images
                            .filter((image, index) => image.is_thumbnail === 1)
                            .shift();

                        return (
                            <div
                                key={units.id}
                                className={`${styles["main-unit-container"]} `}
                                id={`user-${units.id}`}
                            >
                                <div
                                    className={`${styles["image-container"]} `}
                                    onClick={() => unitHandler(units.id)}
                                >
                                    <FavoritesImage
                                        images={
                                            imageThumbnail !== undefined
                                                ? imageThumbnail
                                                : units.images[0]
                                        }
                                    />
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
                                <div
                                    className={`${styles["side-unit-container"]} `}
                                >
                                    <div
                                        className={`${styles["content-container"]} `}
                                    >
                                        <div
                                            className={`${styles["text-container"]} `}
                                            onClick={() =>
                                                unitHandler(units.id)
                                            }
                                        >
                                            <p
                                                className={`${styles["bname-container"]} `}
                                            >
                                                {units.name}
                                            </p>
                                            <FavoritesUnitRating
                                                average_ratings={
                                                    units.average_ratings
                                                }
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
                                                    handleBookmarkClick(
                                                        units.id
                                                    )
                                                }
                                            >
                                                {isBookmarked.includes(
                                                    units.id
                                                ) ? (
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
                                    <div
                                        className={`${styles["button-container"]}`}
                                    >
                                        <Link
                                            to={`/unit_comparison/${units.id}`}
                                        >
                                            <div
                                                className={`${styles["button-compare"]}`}
                                            >
                                                <PiHouseLight
                                                    style={{
                                                        fill: "var(--accent)",
                                                        marginTop: "2px",
                                                    }}
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
                                                    style={{
                                                        fill: "var(--accent)",
                                                    }}
                                                    size={20}
                                                />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className={`${styles["button-add-container"]}`}>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <Fab
                        sx={{ backgroundColor: "var(--accent)" }}
                        aria-label="add"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.71905 20.7507C7.71905 21.8008 6.77101 21.82 6.77101 21.82H4.78096C4.78096 21.82 0 21.5055 0 17.3299V8.28772C0 8.28772 -0.00510894 7.11864 2.42371 5.42417C2.53396 5.32207 9.13205 0.38733 9.13205 0.38733L9.73087 1.18814L9.73094 1.18809L9.13205 0.38733C9.13205 0.38733 10.2555 -0.484163 11.5835 0.38733C12.9114 1.25882 18.0069 5.42417 18.0069 5.42417L17.3739 6.19837L17.3738 6.19825L17.3731 6.19771L17.3704 6.19551L17.3596 6.18668L17.3171 6.15194L17.1538 6.01884C17.0124 5.90365 16.8087 5.73802 16.5602 5.5365C16.0629 5.13336 15.3865 4.58704 14.669 4.01386C13.2119 2.84981 11.65 1.62711 11.0348 1.22337C10.6399 0.964186 10.3208 0.977412 10.0966 1.03207C9.97364 1.06205 9.87199 1.10769 9.80352 1.14467C9.77009 1.16272 9.74708 1.17735 9.73621 1.18457L9.73141 1.18782L9.73098 1.18814L9.73097 1.18812L9.73089 1.18817L9.7309 1.18819L9.73068 1.18836L9.72978 1.18903L9.72621 1.1917L9.71207 1.20228L9.6569 1.24354L9.44736 1.40029L8.69856 1.96059C8.07836 2.42475 7.25033 3.04465 6.41891 3.6677C5.58737 4.29083 4.75287 4.9168 4.11956 5.39322C3.80276 5.63153 3.5371 5.83183 3.34756 5.97546C3.25258 6.04743 3.17804 6.10416 3.12619 6.14397C3.10111 6.16323 3.08574 6.17523 3.07753 6.18163L3.05253 6.20478L2.99588 6.24431C1.86806 7.03114 1.3722 7.64962 1.15863 8.00571C1.05217 8.18322 1.0137 8.29892 1.00127 8.34406L1 8.34875V17.3299C1 18.9282 1.86935 19.7598 2.83946 20.2473C3.33796 20.4977 3.8479 20.6442 4.24071 20.7272C4.43489 20.7683 4.59476 20.7926 4.70265 20.8064C4.75645 20.8133 4.79689 20.8176 4.82173 20.8199L4.82264 20.82H6.71513C6.71732 20.8032 6.71905 20.7804 6.71905 20.7507V17.3345C6.71608 16.9695 6.79811 16.6273 6.97544 16.3307C7.15262 16.0343 7.39076 15.8404 7.61231 15.7184C7.82807 15.5995 8.03369 15.5449 8.17776 15.5186C8.25198 15.505 8.31634 15.4977 8.36645 15.4938C8.39168 15.4918 8.41382 15.4907 8.43236 15.49L8.45761 15.4893L8.46823 15.4892L8.47303 15.4891L8.4753 15.4891L8.4764 15.4891C8.47694 15.4891 8.47748 15.4891 8.47748 16.4838V15.4891H11.4638C11.3398 15.8116 11.239 16.1457 11.1635 16.4891H8.47748C8.47748 16.4891 7.71005 16.4891 7.71905 17.3299V20.7507ZM18.0069 5.42417C20.4788 7.11873 20.53 8.28772 20.53 8.28772V11.4712C20.2076 11.3461 19.8735 11.2443 19.53 11.1677V8.38039C19.5135 8.32924 19.4673 8.20935 19.3525 8.02949C19.1188 7.6634 18.5937 7.03886 17.4415 6.24898L17.4066 6.22512L17.374 6.1984L18.0069 5.42417ZM6.70637 20.8597C6.70633 20.8596 6.70669 20.8586 6.70759 20.8567C6.70687 20.8588 6.70641 20.8598 6.70637 20.8597ZM8.41728 10.3602H4.21729V11.5031H8.41728V13.2174L10.8173 10.9317L8.41728 8.64596V10.3602ZM12.0173 9.78882V8.07454H16.2173V6.93168H12.0173V5.21739L9.61729 7.50311L12.0173 9.78882ZM23 18C23 20.7614 20.7614 23 18 23C15.2386 23 13 20.7614 13 18C13 15.2386 15.2386 13 18 13C20.7614 13 23 15.2386 23 18ZM24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18ZM17.25 20.25C16.3687 20.25 15.484 20.0906 15 19.7496V20.25C15 20.6637 16.0078 21 17.25 21C18.4922 21 19.5 20.6637 19.5 20.25V19.7496C19.016 20.0906 18.1313 20.25 17.25 20.25ZM18.75 16.5C19.9922 16.5 21 16.1637 21 15.75C21 15.3363 19.9922 15 18.75 15C17.5078 15 16.5 15.3363 16.5 15.75C16.5 16.1637 17.5078 16.5 18.75 16.5ZM17.25 19.125C16.3699 19.125 15.484 18.9188 15 18.5203V19.125C15 19.5387 16.0078 19.875 17.25 19.875C18.4922 19.875 19.5 19.5387 19.5 19.125V18.5203C19.016 18.9188 18.1301 19.125 17.25 19.125ZM19.875 18.6492C20.5465 18.5191 21 18.2777 21 18V17.4996C20.7281 17.6918 20.3285 17.823 19.875 17.9039V18.6492ZM17.25 16.875C16.0078 16.875 15 17.2945 15 17.8125C15 18.3305 16.0078 18.75 17.25 18.75C18.4922 18.75 19.5 18.3305 19.5 17.8125C19.5 17.2945 18.4922 16.875 17.25 16.875ZM19.8199 17.5348C20.523 17.4082 21 17.1598 21 16.875V16.3746C20.584 16.6688 19.8691 16.827 19.1168 16.8645C19.4625 17.032 19.7168 17.257 19.8199 17.5348Z"
                                fill="white"
                            />
                        </svg>
                    </Fab>
                </Box>
            </div>
        </div>
    );
};

export default Favorites;
