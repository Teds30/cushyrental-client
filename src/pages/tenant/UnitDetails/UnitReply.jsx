import React, { useEffect, useState } from 'react'
import styles from './UnitReviews.module.css'
import moment from 'moment'
import { IoSend } from 'react-icons/io5'
import { TbFlag } from 'react-icons/tb'
import UnitDetailsRating from './UnitDetailsRating'
import TextField from '../../../components/TextField/TextField'
import UserAvatar from '../../../components/Avatar/UserAvatar'
import Moment from 'react-moment'

const UnitReply = ({
    review,
    showLandlordReply,
    toggleShowLandlordReply,
    handleSendClick,
    loggedInUserId,
}) => {
    const [reviewReply, setReviewReply] = useState(review)
    const [landlordReply, setLandlordReply] = useState('')

    const formatDate = (dateString) => {
        const date = moment(dateString)
        return date.format('DD/MM/YYYY | hh:mm A')
    }

    useEffect(() => {
        const displayReview = () => {
            // const targetReview = review.find();
        }
        // console.log(review);
        displayReview()
    }, [review])

    const handleSendButtonClick = () => {
        if (landlordReply) {
            handleSendClick(reviewReply.id, landlordReply)
            setReviewReply({
                ...review,
                landlord_reply: landlordReply,
                updated_at: new Date(),
            })
        }
    }

    const handleInputChange = (event) => {
        setLandlordReply(event.target.value)
    }

    return (
        <div className={styles['card-container']} key={reviewReply.id}>
            <div className={`${styles['top-card-container']}`}>
                <div className={`${styles['inside-card-container']}`}>
                    <UserAvatar
                        avatar_url={
                            reviewReply.rental.unit.landlord.profile_picture_img
                        }
                        size="40px"
                    />
                    <div className={`${styles['text-card-container']}`}>
                        <p>
                            {`${reviewReply.user.first_name} ${reviewReply.user.last_name}`}
                        </p>
                        <div className={`${styles['profile-star-container']}`}>
                            <div className={`${styles['prof-star-container']}`}>
                                {
                                    <UnitDetailsRating
                                        average_ratings={reviewReply.star}
                                    />
                                }
                            </div>
                            <div>
                                <p className="caption">
                                    {reviewReply.star}
                                    .0/5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className={`${styles['button-flag-container']}`}>
                        <TbFlag />
                    </button>
                </div>
            </div>

            <div className={`${styles['details-container']}`}>
                <p>{reviewReply.message}</p>
            </div>

            <div className={styles['hr']}></div>

            <div className={`${styles['ratings-container']}`}>
                <div className={`${styles['ratings-left-container']}`}>
                    <p>Environment</p>
                    <p>Boarding House</p>
                    <p>Landlord</p>
                </div>
                <div className={`${styles['ratings-right-container']}`}>
                    <UnitDetailsRating
                        average_ratings={reviewReply.environment_star}
                    />
                    <UnitDetailsRating
                        average_ratings={reviewReply.unit_star}
                    />
                    <UnitDetailsRating
                        average_ratings={reviewReply.landlord_star}
                    />
                </div>
            </div>

            <div className={`${styles['date-container']}`}>
                <p>
                    <Moment format="DD/MM/YYYY h:mm a">
                        {reviewReply.created_at}
                    </Moment>
                </p>
                {reviewReply.landlord_reply && (
                    <button
                        onClick={toggleShowLandlordReply}
                        className={`${styles['button-show-container']}`}
                    >
                        {showLandlordReply ? 'Hide Replies' : 'Show Replies'}
                    </button>
                )}
            </div>

            {showLandlordReply && reviewReply.landlord_reply && (
                <div className={styles['landlord-reply-container']}>
                    <div className={`${styles['landlord-top-container']}`}>
                        <p>Landlord's Reply</p>
                    </div>
                    <div className={`${styles['landlord-bottom-container']}`}>
                        <UserAvatar
                            avatar_url={
                                reviewReply.rental.unit.landlord
                                    .profile_picture_img
                            }
                        />
                        <div>
                            <p className="strong">
                                {reviewReply.rental.unit.landlord.first_name}{' '}
                                {reviewReply.rental.unit.landlord.last_name[0]}
                                {'. '}
                                <span className="smaller-text">
                                    •{' '}
                                    <Moment fromNow ago>
                                        {reviewReply.updated_at}
                                    </Moment>{' '}
                                    ago
                                </span>
                            </p>
                            <p className="smaller-text">
                                {reviewReply.landlord_reply}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!reviewReply.landlord_reply &&
                loggedInUserId === reviewReply.rental.unit.landlord_id && (
                    <div className={styles['reply-container']}>
                        <TextField
                            multiline
                            fullWidth
                            variant="outlined"
                            label="Write a reply"
                            value={landlordReply}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={handleSendButtonClick}
                            className={styles['button-send-container']}
                            style={{ fontSize: '25px' }}
                        >
                            <IoSend />
                        </button>
                    </div>
                )}
        </div>
    )
}

export default UnitReply
