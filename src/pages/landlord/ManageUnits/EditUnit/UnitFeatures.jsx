import { Link } from 'react-router-dom'

import CardPlain from '../../../../components/Card/CardPlain'

import styles from './EditUnit.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Fragment } from 'react'

import { TbSocialOff, TbSitemap } from 'react-icons/tb'

const UnitFeatures = (props) => {
    const { id } = props

    return (
        <div className={`${styles['feature-container']}`}>
            <p className={`${styles['unit-details-title']}`}>Features</p>
            <CardPlain filled={'false'}>
                <div className={`${styles['feature-style']}`}>
                    <Link
                        to={`/manage_unit/edit/amenities/${id}`}
                        className={`${styles['feature-style-col']}`}
                    >
                        <div className={`${styles['attribute']}`}>
                            <div
                                className={styles['attribute-icon']}
                                style={{ background: '#9B50D6' }}
                            >
                                <TbSitemap
                                    style={{
                                        fill: 'transparent',
                                        color: '#fff',
                                    }}
                                    size={16}
                                />
                            </div>
                            <p>Amenity</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles['hr']}></div>

                    <Link
                        to={`/manage_unit/edit/facilities/${id}`}
                        className={`${styles['feature-style-col']}`}
                    >
                        <div className={`${styles['attribute']}`}>
                            <div
                                className={styles['attribute-icon']}
                                style={{ background: '#5075D6' }}
                            >
                                <TbSitemap
                                    style={{
                                        fill: 'transparent',
                                        color: '#fff',
                                    }}
                                    size={16}
                                />
                            </div>
                            <p>Facilities</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles['hr']}></div>

                    <Link
                        to={`/manage_unit/edit/inclusions/${id}`}
                        className={`${styles['feature-style-col']}`}
                    >
                        <div className={`${styles['attribute']}`}>
                            <div
                                className={styles['attribute-icon']}
                                style={{ background: '#50D6BD' }}
                            >
                                <TbSitemap
                                    style={{
                                        fill: 'transparent',
                                        color: '#fff',
                                    }}
                                    size={16}
                                />
                            </div>
                            <p>Inclusions</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>

                    <div className={styles['hr']}></div>

                    <Link
                        to={`/manage_unit/edit/rules/${id}`}
                        className={`${styles['feature-style-col']}`}
                    >
                        <div className={`${styles['attribute']}`}>
                            <div
                                className={styles['attribute-icon']}
                                style={{ background: '#D65050' }}
                            >
                                <TbSocialOff
                                    style={{
                                        fill: 'transparent',
                                        color: '#fff',
                                    }}
                                    size={16}
                                />
                            </div>
                            <p>Rules</p>
                        </div>
                        <div>
                            <ChevronRightIcon />
                        </div>
                    </Link>
                </div>
            </CardPlain>
        </div>
    )
}

export default UnitFeatures
