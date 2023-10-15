import { Link, useLocation, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import UnitPhoto from './UnitPhoto'
import CardShadow from '../../../components/Card/CardShadow'
import ChipBig from '../../../components/Chips/ChipBig'
import BorderlessButton from '../../../components/Button/BorderlessButton'
import Facilities from './Facilities'
import Amenities from './Amenities'
import Rules from './Rules'
import PaymentAndInclusion from './PaymentsAndInclusion'
import SimilarUnits from './SimilarUnits'
import LandlordProfile from './LandlordProfile'
import TenantReviews from './TenantReviews'
import BorderedButton from '../../../components/Button/BorderedButton'

import styles from './ViewUnitDetails.module.css'

import { CiLocationOn } from 'react-icons/ci'
import { TbMapPin } from 'react-icons/tb'

import { useState } from 'react'

const genders = [
    {
        id: '1',
        name: 'Male',
        icon: 'male.svg',
    },
    {
        id: '2',
        name: 'Female',
        icon: 'female.svg',
    },
    {
        id: '3',
        name: 'Both',
        icon: 'allgender.svg',
    },
]

const UnitDetails = (props) => {
    const { unit } = props

    const navigate = useNavigate()
    const url_location = useLocation()

    const handleUnitLocationClick = () => {
        navigate('/unit_location')
    }

    const location = unit.location.replace(/\s/g, '')

    const [gender, setGender] = useState(
        unit.gender === 1 ? 'Male' : unit.gender === 2 ? 'Female' : 'Both'
    )
    const [readMore, setReadMore] = useState(false)

    const readMoreChangeHandler = () => {
        setReadMore((prevReadMore) => !prevReadMore)
    }

    return (
        <div className={`${styles['unit-details-main']}`}>
            <div className={`${styles['unit-photo']}`}>
                <UnitPhoto images={unit.images} />
            </div>

            <div className={`${styles['unit-details-row']}`}>
                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <div className={styles.price}>
                            <p className="title" style={{ fontSize: '16px' }}>
                                PHP {unit.price}{' '}
                            </p>
                            <p
                                className="smaller-text"
                                style={{
                                    fontSize: '10px',
                                    marginTop: '5px',
                                    fontWeight: '600',
                                }}
                            >
                                {' '}
                                / MONTH
                            </p>
                        </div>
                        <p className={styles.details}>{unit.name}</p>
                        <div className={styles.ratings}>
                            <Rating
                                name="disabled"
                                value={0}
                                disabled
                                sx={{
                                    color: 'var(--accent)',
                                    '& svg': {
                                        fill: 'var(--accent)',
                                    },
                                }}
                            />
                            <p>{unit.average_ratings}</p>
                            <div className={`${styles['vertical-line']}`}></div>
                            <p>{unit.slots} Slots</p>
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <div className={styles.location}>
                            <div className={styles.address}>
                                <TbMapPin
                                    size={16}
                                    style={{
                                        stroke: 'var(--fc-body)',
                                        fill: 'transparent',
                                        marginRight: '4px',
                                    }}
                                />
                                <p
                                    className="title"
                                    style={{
                                        color: 'var(--fc-body)',
                                        fontWeight: '400',
                                    }}
                                >
                                    {unit.address}
                                </p>
                            </div>
                            <Link
                                to={`/unit/unit_address/${unit.id}?center=${location}`}
                                onClick={handleUnitLocationClick}
                                style={{ color: 'var(--accent)' }}
                            >
                                <BorderlessButton width="100%">
                                    View on Map
                                </BorderlessButton>
                            </Link>
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <div className={styles.location}>
                            <p className="title">Target Tenant</p>
                            <ChipBig
                                items={genders.filter(
                                    (tenantGender) =>
                                        tenantGender.name === gender
                                )}
                                clickable={false}
                            />
                        </div>
                    </div>
                </CardShadow>

                <CardShadow>
                    <div
                        className={`${styles['unit-detials-col']}`}
                        style={{ textAlign: 'justify' }}
                    >
                        <p className="title">Details</p>
                        <p style={{ textIndent: '4%' }}>
                            {readMore === true
                                ? unit.details
                                : unit.details.substring(0, 300) + '...'}
                        </p>
                        <div>
                            {/* Use onClick instead of onChange */}
                            {unit.details.length > 300 && (
                                <BorderlessButton
                                    onClick={readMoreChangeHandler}
                                >
                                    {!readMore ? 'Read More' : 'Read Less'}
                                </BorderlessButton>
                            )}
                        </div>
                    </div>
                </CardShadow>

                <div className={`${styles['reviews']}`}>
                    <p className="title">Reviews</p>

                    <TenantReviews userId={unit.id} />
                </div>

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <p className="title">Amenities</p>

                        <Amenities amenities={unit.amenities} />
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <p className="title">Facilities</p>

                        <Facilities facilities={unit.facilities} />
                    </div>
                </CardShadow>

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <p className="title">Rules</p>

                        <Rules rules={unit.rules} />
                    </div>
                </CardShadow>

                {/* <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <p className="title">Payment & Inclusions</p>

                        <PaymentAndInclusion
                            paymentAndInclusions={{
                                month_advance: unit.month_advance,
                                month_deposit: unit.month_deposit,
                                inclusions: unit.inclusions,
                            }}
                        />
                    </div>
                </CardShadow> */}

                <CardShadow>
                    <div className={`${styles['unit-detials-col']}`}>
                        <LandlordProfile
                            user={{ ...unit.landlord, address: unit.address }}
                        />
                    </div>
                </CardShadow>

                <div className={`${styles['similar-units']}`}>
                    <p className="title">Similar Units</p>
                    <SimilarUnits unitPrice={unit.price} />
                </div>
            </div>
        </div>
    )
}

export default UnitDetails
