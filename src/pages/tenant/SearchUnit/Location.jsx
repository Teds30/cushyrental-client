import { useState } from "react";
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

const locations = [
    {
        id: 1,
        name: "Location",
        icon: "location.svg",
    },
    {
        id: 2,
        name: "Institution",
        icon: "institution.svg",
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

const Location = () => {
    const [searchType, setSearchType] = useState(1);
    const [radius, setRadius] = useState(3);
    const [locationZone, setLocationZone] = useState();

    const locationHandler = (value) => {
        setSearchType(value[0]);
    };

    const radiusHandler = (value) => {
        setRadius(value[0]);
    };

    const mapHandler = () => {
        // code here...
    };

    const locationZoneHandler = (value) => {
        setLocationZone(value[0]);
    };

    const cardStyle = {
        display: "flex",
        flexDirection: "columns",
        gap: "13px",
    };

    return (
        <div className={`${styles["location-main"]}`}>
            <CardPlain style={cardStyle}>
                <p className="title" style={{ fontSize: "16px" }}>
                    Search
                </p>
                <LocationDropdown searchType={searchType} />

                <div className={`${styles["location-button"]}`}>
                    <ChipOutlined
                        items={locations}
                        button="radio"
                        selected={[searchType]}
                        onChipValue={locationHandler}
                    />
                </div>
            </CardPlain>

            <CardPlain style={cardStyle}>
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

            <CardPlain style={cardStyle}>
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
                                margin: "0",
                            },
                        }}
                        onClick={mapHandler}
                    >
                        <div className={`${styles['map-title']}`}>
                            <BsMap/>
                            <p className="title"> Map</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                        <div className={`${styles["location-map"]}`}>
                            <div className={`${styles["hr"]}`}></div>
                            <div className={`${styles["location-zone"]}`}>
                                <ChipOutlined
                                    items={[
                                        {
                                            id: 1,
                                            name: "Show Location Zone",
                                            icon: "location.svg",
                                        },
                                    ]}
                                    // button="radio"
                                    // selected={[searchType]}
                                    onChipValue={locationZoneHandler}
                                />
                                <Tooltip title="Information here...">
                                    <IconButton>
                                        <IoIosInformationCircleOutline style={{fill: '--fc-body-light'}} />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <Map/>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </CardPlain>

            <div className={`${styles["search-button"]}`}>
                <PrimaryButton width="100%">Search</PrimaryButton>
            </div>
        </div>
    );
};

export default Location;
