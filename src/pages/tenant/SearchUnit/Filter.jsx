import { useState } from "react";

import CardPlain from "../../../components/Card/CardPlain";
import Gender from "./Gender";
import PriceRange from "./PriceRange";
import UnitRating from "./UnitRating";
import UnitQuantity from "./UnitQuantity";
import Amenities from "./Amenities";
import Facilities from "./Facilities";
import Inclusions from "./Inclusions";
import Rules from "./Rules";
import PrimaryButton from "../../../components/Button/PrimaryButton";

import styles from "./SearchUnit.module.css";

const Filter = (props) => {
    const { attributes } = props;
    const [unitData, setUnitData] = useState({});

    const genderHandler = (value) => {
        setUnitData({ ...unitData, gender: value });
    };

    const priceRangeHandler = (value) => {
        setUnitData({ ...unitData, price_range: value });
    };

    const ratingHandler = (value) => {
        setUnitData({ ...unitData, rating: value });
    };

    const quantityHandler = (value) => {
        setUnitData({ ...unitData, quantity: value });
    };

    const amenityHandler = (value) => {
        setUnitData({ ...unitData, amenity: value });
    };

    const facilityHandler = (value) => {
        setUnitData({ ...unitData, facility: value });
    };

    const inclusionHandler = (value) => {
        setUnitData({ ...unitData, inclusion: value });
    };

    const ruleHandler = (value) => {
        setUnitData({ ...unitData, rule: value });
    };

    const cardStyle = {
        display: "flex",
        flexDirection: "columns",
        gap: "13px",
    };

    console.log(unitData);

    return (
        <div className={`${styles["filter-main"]}`}>
            <CardPlain style={cardStyle}>
                <Gender onGender={genderHandler} />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <PriceRange onPriceRange={priceRangeHandler} />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <UnitRating onRating={ratingHandler} />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <UnitQuantity onQuantity={quantityHandler} />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Amenities amenities={attributes.amenities} onAmenity={amenityHandler}/>
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Facilities facilities={attributes.facilities} onFacility={facilityHandler}/>
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Inclusions inclusions={attributes.inclusions} onInclusion={inclusionHandler}/>
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Rules rules={attributes.rules} onRule={ruleHandler}/>
            </CardPlain>

            <PrimaryButton width="100%">Search</PrimaryButton>
        </div>
    );
};

export default Filter;
