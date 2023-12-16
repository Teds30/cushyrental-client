import { Fragment, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import LocationDropdown from "./LocationDropdown";
import CardPlain from "../../../components/Card/CardPlain";
import ChipOutlined from "../../../components/Chips/ChipOutlined";
import RadiusChip from "./RadiusChip";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import Map from "./Map";

import styles from "./SearchUnit.module.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsMap } from "react-icons/bs";
import { TbMapPin } from "react-icons/tb";
import { FaUniversity } from "react-icons/fa";

import {
    LoadScript,
    StandaloneSearchBox,
    useLoadScript,
    useJsApiLoader,
} from "@react-google-maps/api";

import SearchField from "../../../components/SearchLocation/SearchField";

const lib = ["places"];

const locations = [
    {
        id: 1,
        name: "Location",
        fixedIcon: (
            <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth=".2"
                stroke="currentColor"
                color="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.625 5.55859C2.625 3.22927 4.60529 1.375 7 1.375C9.39471 1.375 11.375 3.22927 11.375 5.55859C11.375 6.87177 10.665 8.49645 9.88724 9.90073C9.09732 11.327 8.18754 12.6118 7.70022 13.2699C7.61989 13.3793 7.51504 13.4683 7.39404 13.5299C7.27198 13.5921 7.13696 13.6244 7 13.6244C6.86304 13.6244 6.72802 13.5921 6.60596 13.5299C6.4845 13.4681 6.3793 13.3786 6.29885 13.2686C5.81133 12.6099 4.90218 11.3253 4.11275 9.89979C3.33503 8.4954 2.625 6.87083 2.625 5.55859ZM7 2.25C5.04705 2.25 3.5 3.75299 3.5 5.55859C3.5 6.62526 4.10247 8.07508 4.87821 9.47589C5.64018 10.8518 6.52274 12.1002 7 12.7451C7.47724 12.1005 8.35982 10.8526 9.1218 9.47679C9.8975 8.07623 10.5 6.62624 10.5 5.55859C10.5 3.75299 8.95295 2.25 7 2.25Z"
                    fill="#8A93A6"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 4.875C6.51675 4.875 6.125 5.26675 6.125 5.75C6.125 6.23325 6.51675 6.625 7 6.625C7.48325 6.625 7.875 6.23325 7.875 5.75C7.875 5.26675 7.48325 4.875 7 4.875ZM5.25 5.75C5.25 4.7835 6.0335 4 7 4C7.9665 4 8.75 4.7835 8.75 5.75C8.75 6.7165 7.9665 7.5 7 7.5C6.0335 7.5 5.25 6.7165 5.25 5.75Z"
                    fill="#8A93A6"
                />
            </svg>

            // <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     className="icon icon-tabler icon-tabler-location"
            //     width="24"
            //     height="24"
            //     viewBox="0 0 24 24"
            //     strokeWidth="2"
            //     stroke="currentColor"
            //     color="currentColor"
            //     fill="none"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            // >
            //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            //     <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            // </svg>
        ),
    },
    {
        id: 2,
        name: "Institution",
        fixedIcon: (
            <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-school"
                strokeWidth=".7"
                stroke="currentColor"
                color="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d="M14 3.50001V4.00001C14 4.06631 13.9754 4.1299 13.9317 4.17678C13.8879 4.22367 13.8286 4.25001 13.7667 4.25001H13.0667V4.62501C13.0667 4.8321 12.91 5.00001 12.7167 5.00001H1.28333C1.09005 5.00001 0.933333 4.8321 0.933333 4.62501V4.25001H0.233333C0.171449 4.25001 0.1121 4.22367 0.0683417 4.17678C0.0245833 4.1299 0 4.06631 0 4.00001V3.50001C3.33709e-07 3.45055 0.0136931 3.4022 0.0393459 3.36108C0.0649986 3.31996 0.101459 3.28792 0.144112 3.26901L6.91078 0.519008C6.96791 0.493664 7.03209 0.493664 7.08922 0.519008L13.8559 3.26901C13.8985 3.28792 13.935 3.31996 13.9607 3.36108C13.9863 3.4022 14 3.45055 14 3.50001ZM13.3 13H0.7C0.313396 13 0 13.3358 0 13.75V14.25C0 14.3163 0.0245833 14.3799 0.0683417 14.4268C0.1121 14.4737 0.171449 14.5 0.233333 14.5H13.7667C13.8286 14.5 13.8879 14.4737 13.9317 14.4268C13.9754 14.3799 14 14.3163 14 14.25V13.75C14 13.3358 13.6866 13 13.3 13ZM2.33333 5.50001V11.5H1.28333C1.09005 11.5 0.933333 11.6679 0.933333 11.875V12.5H13.0667V11.875C13.0667 11.6679 12.91 11.5 12.7167 11.5H11.6667V5.50001H9.8V11.5H7.93333V5.50001H6.06667V11.5H4.2V5.50001H2.33333Z"
                    fill="#none"
                />
            </svg>
            // <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     className="icon icon-tabler icon-tabler-school"
            //     width="24"
            //     height="24"
            //     viewBox="0 0 24 24"
            //     strokeWidth="2"
            //     stroke="currentColor"
            //     fill="none"
            //     color="currentColor"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            // >
            //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            //     <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
            //     <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
            // </svg>
        ),
    },
];

const radiusList = [
    {
        id: 1,
        name: "500 meters",
    },
    {
        id: 2,
        name: "1 kilometer",
    },
    {
        id: 3,
        name: "2 kilometer",
    },
];

const Location = (props) => {
    const {
        mapref,
        setMapRef,
        radius,
        setRadius,
        searchType,
        setSearchType,
        coordinates,
        setCoordinates,
        location,
        setLocation,
        universities,
    } = props;

    const [locationZone, setLocationZone] = useState();

    const [isMapOpen, setIsMapOpen] = useState(false);

    const searchRef = useRef();
    const [searchBox, setSearchBox] = useState(null);
    const onSBLoad = (ref) => {
        setSearchBox(ref);
    };

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const locationHandler = (value) => {
        setSearchType(value[0]);
    };

    const radiusHandler = (value) => {
        setRadius(value[0]);
    };

    const mapHandler = () => {
        if (isMapOpen) {
            setIsMapOpen(false);
        } else {
            setIsMapOpen(true);
        }
    };

    const locationZoneHandler = (value) => {
        setLocationZone(value[0]);
    };

    const cardStyle = {
        display: "flex",
        flexDirection: "columns",
        gap: "12px",
    };

    const mapOpenStyles = isMapOpen
        ? { paddingInline: "0px" }
        : { paddingInline: "12px" };

    const mapCardOpenStyles = isMapOpen
        ? { ...cardStyle, padding: "0px" }
        : { ...cardStyle };

    const handleChangeCenter = (coords) => {
        // console.log(coords)
        setCoordinates(coords);
    };

    const handleChangeCoords = (coords) => {
        setCoordinates(coords);
    };

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        // Handle the selected place(s) here
        handleChangeCoords({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
        });
    };

    const handleOnLoad = (map) => {
        setMapRef(map);
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
        libraries: lib,
        onLoad: handleOnLoad,
    });

    return (
        <div className={`${styles["location-main"]}`}>
            {isLoaded && (
                <Fragment>
                    <div
                        className={styles["card-container"]}
                        style={{ paddingInline: "12px" }}
                    >
                        <CardPlain style={{ ...cardStyle }}>
                            <p className="title" style={{ fontSize: "16px" }}>
                                Search
                            </p>

                            {searchType === 1 && (
                                <StandaloneSearchBox
                                    // onLoad={(ref) => (searchBox = ref)}
                                    ref={searchRef}
                                    onPlacesChanged={onPlacesChanged}
                                    onLoad={onSBLoad}
                                >
                                    <SearchField placeholder="Example: 'Rawis' or 'Daraga'" />
                                </StandaloneSearchBox>
                            )}
                            {searchType === 2 && (
                                <LocationDropdown
                                    searchType={searchType}
                                    universities={universities}
                                    location={location}
                                    onChangeLocation={handleChangeLocation}
                                />
                            )}

                            <div className={`${styles["location-button"]}`}>
                                <ChipOutlined
                                    items={locations}
                                    button="radio"
                                    selected={[searchType]}
                                    onChipValue={locationHandler}
                                />
                            </div>
                        </CardPlain>
                    </div>

                    <div
                        className={styles["card-container"]}
                        style={{ paddingInline: "12px" }}
                    >
                        <CardPlain style={{ ...cardStyle }}>
                            <p className="title" style={{ fontSize: "16px" }}>
                                Radius
                            </p>

                            <div className={`${styles["hr"]}`}></div>

                            <div className={`${styles["location-button"]}`}>
                                <RadiusChip
                                    items={radiusList}
                                    button="radio"
                                    selected={[radius]}
                                    onChipValue={radiusHandler}
                                />
                            </div>
                        </CardPlain>
                    </div>
                    <div
                        className={styles["card-container"]}
                        style={mapOpenStyles}
                    >
                        <CardPlain
                            style={{
                                ...mapCardOpenStyles,
                                paddingInline: "0px",
                            }}
                        >
                            <Accordion
                                sx={{
                                    border: "none",
                                    outline: "none",
                                    background: "rgba(255, 255, 255, 0.80)",
                                    boxShadow: "none",
                                    padding: "0",
                                }}
                            >
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{
                                        padding: "0",
                                        "& MuiAccordionSummary-content": {
                                            padding: "0",
                                            margin: "0",
                                        },
                                    }}
                                    onClick={mapHandler}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        textAlign: "start",
                                        alignItems: "flex-start",
                                        paddingInline: "12px",
                                    }}
                                >
                                    <p
                                        className="title"
                                        style={{
                                            fontSize: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <BsMap />
                                        <span>Map</span>
                                    </p>

                                    <div className={`${styles["hr"]}`}></div>
                                    {/* <div
                                className={`${styles['map-title']}`}
                                style={{ paddingInline: '12px' }}
                            >
                                <BsMap />
                                <p className="title"> Map</p>
                            </div> */}
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{ padding: isMapOpen && "0" }}
                                >
                                    <div
                                        className={`${styles["location-map"]}`}
                                    >
                                        <div
                                            className={`${styles["hr"]}`}
                                        ></div>

                                        <Map
                                            mapref={mapref}
                                            setMapRef={setMapRef}
                                            radius={radius}
                                            location={location}
                                            coordinates={coordinates}
                                            onMapLoad={handleOnLoad}
                                            // setCoordinates={setCoordinates}
                                            searchType={searchType}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </CardPlain>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Location;
