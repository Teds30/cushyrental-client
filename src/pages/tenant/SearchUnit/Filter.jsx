import { useState } from 'react'

import CardPlain from '../../../components/Card/CardPlain'
import Gender from './Gender'
import PriceRange from './PriceRange'
import UnitRating from './UnitRating'
import UnitQuantity from './UnitQuantity'
import Amenities from './Amenities'
import Facilities from './Facilities'
import Inclusions from './Inclusions'
import Rules from './Rules'
import PrimaryButton from '../../../components/Button/PrimaryButton'

import styles from './SearchUnit.module.css'

const Filter = (props) => {
    const { attributes, setFilters, filters } = props

    const genderHandler = (value) => {
        setFilters({ ...filters, gender: value })
    }

    const priceRangeHandler = (value) => {
        setFilters({ ...filters, price_range: value })
    }

    const ratingHandler = (value) => {
        setFilters({ ...filters, rating: value })
    }

    const quantityHandler = (value) => {
        setFilters({ ...filters, quantity: value })
    }

    const amenityHandler = (value) => {
        setFilters({ ...filters, amenity: value })
    }

    const facilityHandler = (value) => {
        setFilters({ ...filters, facility: value })
    }

    const inclusionHandler = (value) => {
        setFilters({ ...filters, inclusion: value })
    }

    const ruleHandler = (value) => {
        setFilters({ ...filters, rule: value })
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'columns',
        gap: '13px',
    }

    return (
        <div className={`${styles['filter-main']}`}>
            <CardPlain style={cardStyle}>
                <Gender onGender={genderHandler} genderValue={filters.gender} />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <PriceRange
                    onPriceRange={priceRangeHandler}
                    priceValue={filters.price_range}
                />
            </CardPlain>

            {/* <CardPlain style={cardStyle}>
                <UnitRating onRating={ratingHandler} />
            </CardPlain> */}

            <CardPlain style={cardStyle}>
                <UnitQuantity
                    onQuantity={quantityHandler}
                    quantityValue={filters.quantity}
                />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Amenities
                    amenities={attributes.amenities}
                    onAmenity={amenityHandler}
                    amenityValue={filters.amenity}
                />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Facilities
                    facilities={attributes.facilities}
                    onFacility={facilityHandler}
                    facilityValue={filters.facility}
                />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Inclusions
                    inclusions={attributes.inclusions}
                    onInclusion={inclusionHandler}
                    inclusionValue={filters.inclusion}
                />
            </CardPlain>

            <CardPlain style={cardStyle}>
                <Rules
                    rules={attributes.rules}
                    onRule={ruleHandler}
                    ruleValue={filters.rule}
                />
            </CardPlain>
        </div>
    )
}

export default Filter
