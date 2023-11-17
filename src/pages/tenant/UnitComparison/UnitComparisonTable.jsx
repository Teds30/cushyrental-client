import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import UnitPhotos from "./UnitPhotos";
import RemoveUnit from "./RemoveUnit";
import UnitComparisonSwipeableCard from "./UnitComparisonSwipeableCard";
import useBookmark from "../../../hooks/data/bookmark-hook";
import Bookmark from "./Bookmark";
import CardPlain from "../../../components/Card/CardPlain";
import UnitRating from "./UnitRating";
import UnitAmenities from "./UnitAmenities";
import UnitFacilities from "./UnitFacilities";
import UnitInclusions from "./UnitInclusions";
import UnitRules from "./UnitRules";
import UnitGender from "./UnitGender";
import AuthContext from "../../../context/auth-context";

import styles from "./UnitComparison.module.css";
import TextMarque from "./TextMarque";

const UnitComparisonTable = (props) => {
    const { unitData } = props;
    const { fetchBookmarkUnits, isLoading } = useBookmark();
    const userCtx = useContext(AuthContext);

    const [bookmarks, setBookmarks] = useState([]);
    const [units, setUnits] = useState([unitData]);
    const [open, setOpen] = useState(false);

    let unitIndex;

    console.log(userCtx.user);

    const removeUnitHandler = (id) => {
        setUnits(units.filter((unit) => unit.id !== id));
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const selectedUnitHandler = (data) => {
        setUnits(prevUnits => {
            const unitIds = prevUnits.map(unit => unit.id);
            const presentUnits = data.map(unit => unit.id);
            const newData = data.filter(element => !unitIds.includes(element.id));
    
            console.log(newData);

            if (newData.length === 0) {
                return prevUnits.filter(unit => presentUnits.includes(unit.id));
            } else {
                if (data.lenth === 3) {
                    return data;
                }
                const updatedUnits = [...prevUnits, ...newData];
                console.log('pumasok dito');
                return updatedUnits;
            }
        });

        setOpen(false);
    };

    const unitContent = units.map((unit, index) => {
        unitIndex = index;
    
        return (
            <div key={index} className={`${styles["unit-photo-col"]}`}>
                <div className={`${styles["photo"]}`}>
                    <UnitPhotos images={unit.images} />
    
                    <Button
                        onClick={() => removeUnitHandler(unit.id)}
                        sx={{
                            position: " absolute",
                            top: "8px",
                            right: "8px",
                            padding: "0",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "end",
                            minWidth: "fit-content",
                        }}
                    >
                        <RemoveUnit />
                    </Button>
                </div>
    
                <TextMarque name={unit.name}/>
            </div>
        );
    });

    const priceContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}>Php {unit.price.toFixed(2)}</div>
    })

    const ratingContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitRating rating={unit.average_ratings}/></div>
    })


    const addressContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}>{unit.address}</div>
    })

    const amenitiesContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitAmenities amenitiesId={unit.amenities.map(amenity => amenity.id)}/></div>
    })

    const facilitiesContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitFacilities unitFacilities={unit.facilities}/></div>
    })

    const inclusionsContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitInclusions inclusionsId={unit.inclusions.map(inclusion => inclusion.id)}/></div>
    })

    const rulesContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitRules items={unit.rules}/></div>
    })

    const genderContent = units.map((unit, index) => {
        return <div key={index} className={`${styles['content']}`}><UnitGender genderId={unit.target_gender}/></div>
    })
    
    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchBookmarkUnits(userCtx.user.id);
                console.log(res);
                setBookmarks(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={`${styles["unit-comparison-main"]}`}>
            <div className={`${styles["unit-photo"]}`}>
                {unitContent}
                {unitIndex + 1 !== 3 && (
                    <div
                        className={`${styles["unit-photo-col"]} ${styles["add-photo-col"]}`}
                    >
                        <Button
                            variant="text"
                            className={`${styles["add-unit"]}`}
                        >
                            <div
                                className={`${styles["icon-container"]}`}
                                onClick={toggleDrawer(true)}
                            >
                                <AddIcon
                                    className={`${styles["icon"]}`}
                                    sx={{ width: "30px", height: "30px" }}
                                />
                            </div>
                        </Button>
                    </div>
                )}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    PRICE
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {priceContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    RATING
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {ratingContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    LOCATION
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {addressContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    AMENITIES
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {amenitiesContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    FACILITIES
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {facilitiesContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    INCLUSIONS
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {inclusionsContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    RULES
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {rulesContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <CardPlain>
                <div className={`${styles['bookmark-title']}`}>
                    GENDER
                </div>
            </CardPlain>

            <div className={`${styles['bookmark-content']}`}>
                    {genderContent}
                    {unitIndex + 1 !== 3 && (<div className={`${styles['content']}`} />)}
            </div>

            <UnitComparisonSwipeableCard
                open={open}
                onOpen={toggleDrawer}
                closeDrawer={handleCloseDrawer}
            >
                {!isLoading && (
                    <Bookmark units={bookmarks} onSelectedUnitList={selectedUnitHandler} selectedUnitList={units.map(unit => unit.id)} onCompare={handleCloseDrawer} />
                )}
            </UnitComparisonSwipeableCard>
        </div>
    );
};

export default UnitComparisonTable;
