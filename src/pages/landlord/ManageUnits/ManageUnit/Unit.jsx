import { Link } from 'react-router-dom'

import CardPlain from '../../../../components/Card/CardPlain'
import Status from './Status'
import PrimaryButton from '../../../../components/Button/PrimaryButton'
import BorderedButton from '../../../../components/Button/BorderedButton'
import useImageManager from '../../../../hooks/data/image-hook'

import styles from './ManageUnit.module.css'
import photo from '../../../../assets/cushyrental.svg'
import { CiLocationOn } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import UnitImage from './UnitImage'

const Unit = (props) => {
    const { user_unit } = props

    // console.log(user_unit);

    const { fetchImage, fetchImages, isLoading } = useImageManager()
    const [image, setImage] = useState(
        user_unit.images.filter((image) => image.is_thumbnail === 1)
    )
    const [unitPhoto, setUnitPhoto] = useState('')

    let gender

    if (user_unit.targte_gender === 1) {
        gender = 'Male'
    } else if (user_unit.targte_gender === 1) {
        gender = 'Female'
    } else {
        gender = 'All'
    }

    const subscriptions = user_unit.subscriptions.filter((subscription) => {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Add 1 to the month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0')

        const formattedDate = `${year}-${month}-${day}`

        if (
            formattedDate >= subscription.date_start.split(' ')[0] &&
            formattedDate <= subscription.date_end.split(' ')[0]
        ) {
            // console.log("pumasok dito")
            return subscription
        } else if (subscription.request_status === 0) {
            return subscription
        }
    })

    const requestStatus =
        user_unit.request_status === 0
            ? user_unit.request_status
            : user_unit.request_status === 2 && 3

    const imageThumbnail = user_unit.images
        .filter((image, index) => image.is_thumbnail === 1)
        .shift();

    console.log(imageThumbnail);

    return (
        <div className={`${styles['units-container']}`}>
            <CardPlain
                filled="false"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    borderRadius: '0',
                }}
            >
                <div className={`${styles['unit-col']}`}>
                    <UnitImage imageThumbnail={imageThumbnail !== undefined ? imageThumbnail : user_unit.images[0]} />

                    <div className={`${styles['col-data']}`}>
                        <div>
                            <Status
                                unitRequestStatus={
                                    requestStatus !== false
                                        ? requestStatus
                                        : user_unit.is_listed === 0
                                        ? 2
                                        : user_unit.is_listed
                                }
                            />
                        </div>
                        <div className="title">{user_unit.name}</div>
                        <div className={`${styles['col-address']}`}>
                            <div>
                                <CiLocationOn />
                            </div>
                            <div className="caption">{user_unit.address}</div>
                        </div>
                        <div
                            className="title"
                            style={{ fontSize: '16px', color: 'var(--accent)' }}
                        >
                            Php {user_unit.price}
                        </div>
                    </div>
                </div>

                <div className={styles['hr']}></div>

                <div className={`${styles['col-data-2']}`}>
                    <div className={`${styles['unit-datas']}`}>
                        <div className="pre-title">Rating</div>
                        <p className="title">{user_unit.average_ratings}</p>
                    </div>

                    <div className={`${styles['hr-horizontal']}`}></div>

                    <div className={`${styles['unit-datas']}`}>
                        <div className="pre-title">Available Slot</div>
                        <p className="title">{user_unit.slots}</p>
                    </div>

                    <div className={`${styles['hr-horizontal']}`}></div>

                    <div className={`${styles['unit-datas']}`}>
                        <div className="pre-title">Subscription</div>
                        <p className="title">
                            {subscriptions.length !== 0
                                ? subscriptions[0].subscription_id === 1
                                    ? 'Bronze'
                                    : subscriptions[0].subscription_id === 2
                                    ? 'Silver'
                                    : subscriptions[0].subscription_id === 3 &&
                                      'Gold'
                                : 'None'}
                        </p>
                    </div>

                    <div className={`${styles['hr-horizontal']}`}></div>

                    <div className={`${styles['unit-datas']}`}>
                        <div className="pre-title">Target</div>
                        <p className="title">{gender}</p>
                    </div>
                </div>

                {requestStatus === false &&
                    (subscriptions.length !== 0 ? (
                        user_unit.request_status === 0 ? (
                            <BorderedButton width="100%" btnType="danger">
                                Cancel Unit Request
                            </BorderedButton>
                        ) : (
                            user_unit.request_status === 1 && (
                                <div className={`${styles['unit-button']}`}>
                                    <Link
                                        to={`/manage_unit/edit/${user_unit.id}`}
                                        style={{ width: '100%' }}
                                    >
                                        <PrimaryButton width="100%">
                                            Manage Unit
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            )
                        )
                    ) : (
                        <div className={`${styles['unit-button']}`}>
                            <Link
                                to={`/manage_unit/edit/${user_unit.id}`}
                                style={{ width: '100%' }}
                            >
                                <PrimaryButton width="100%">
                                    Manage Unit
                                </PrimaryButton>
                            </Link>
                            <BorderedButton>Promote</BorderedButton>
                        </div>
                    ))}
            </CardPlain>
        </div>
    )
}

export default Unit
