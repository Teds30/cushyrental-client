import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import TextField from '../../components/TextField/TextField'
import Dropdown from '../../components/Dropdown/Dropdown'
import PrimaryButton from '../../components/Button/PrimaryButton'
import useUserManager from '../../hooks/data/users-hook'
import AuthContext from '../../context/auth-context'
import useNotistack from '../../hooks/notistack-hook'
import useVerificationManager from '../../hooks/data/verifications-hook'

import styles from './EditProfile.module.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import UserAvatar from '../../components/Avatar/UserAvatar'

import useImageManager from '../../hooks/data/image-hook'

const EditProfileForm = (props) => {
    const { userData = {} } = props
    const { updateUser } = useUserManager()
    const userCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const { notify } = useNotistack()
    const { fetchLandlordVerification, isLoading } = useVerificationManager()

    const [user, setUser] = useState(userCtx.user)
    const [accountVerification, setAccountVerification] = useState([])
    const [newIimage, setNewImage] = useState({})
    const [firstName, setFirstName] = useState(userData.first_name)
    const [middleName, setMiddleName] = useState(userData.middle_name)
    const [lastName, setLastName] = useState(userData.last_name)
    const [isSaving, setISaving] = useState(false)

    const { uploadImage } = useImageManager()

    const addImageChangeHandler = (event) => {
        const image = URL.createObjectURL(event.target.files[0])
        setNewImage({
            file: event.target.files[0],
            image: image,
            name: event.target.files[0].name,
        })
    }

    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value)
    }

    const middleNameChangeHandler = (event) => {
        setMiddleName(event.target.value)
    }

    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value)
    }

    const numberChangeHandler = (event) => {
        setUser({ ...user, phone_number: event.target.value })
    }

    const genderChangeHandler = (event) => {
        const gender = event.target.value
        setUser({
            ...user,
            gender: gender === 'Male' ? 0 : gender === 'Female' ? 1 : 2,
        })
    }

    const handleFileUpload = async () => {
        console.log('orunnn: ', {
            file: newIimage.file,
            name: newIimage.name,
            path: 'profile_pictures',
        })
        try {
            const res = await uploadImage({
                file: newIimage.file,
                name: newIimage.name,
                path: 'profile_pictures',
            })

            console.log('image uploaded')

            const userUpdate = {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                phone_number: user.phone_number,
                gender: user.gender.toString(),
                profile_picture_img: res.name,
            }

            console.log('updating user')
            const resUpdate = await updateUser(userUpdate, user.id)

            console.log('updated user')
            userCtx.onLogin({ user: resUpdate, token: userCtx.token })
            navigate('/profile')
            notify('User update successfully!', 'success')
        } catch (err) {}
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        if (
            middleName === '' ||
            user.phone_number === '' ||
            user.gender === ''
        ) {
            return
        }

        console.log('saving')

        setISaving(true)
        console.log('state saved')

        if (Object.keys(newIimage).length > 0) {
            handleFileUpload()
        } else {
            try {
                const userUpdate = {
                    first_name: firstName,
                    middle_name: middleName,
                    last_name: lastName,
                    phone_number: user.phone_number,
                    gender: user.gender.toString(),
                    profile_picture_img: userCtx.user.profile_picture_img,
                }

                console.log('updating user...')
                const resUpdate = await updateUser(userUpdate, user.id)
                console.log('saved')
                // userCtx.onLogin({ user: resUpdate, token: userCtx.token })
                navigate('/profile')
                notify('User update successfully!', 'success')
            } catch (err) {}
        }
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchLandlordVerification(user.id)
                // if (res.data.verdict === 0 && res.data.reason_denied !== null) {
                //     notify(
                //         'Verification denied, please verify account again!',
                //         'info'
                //     )
                // }

                setAccountVerification(res)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    return (
        <div className={`${styles['edit-profile-main']}`}>
            <div className={`${styles['user-details']}`}>
                <div className={styles.photo}>
                    {Object.keys(newIimage).length === 0 ? (
                        <UserAvatar
                            avatar_url={
                                userCtx.user && userCtx.user.profile_picture_img
                            }
                            size="100px"
                        />
                    ) : (
                        <img
                            src={
                                Object.keys(newIimage).length === 0
                                    ? user.profile_picture_img
                                    : newIimage.image
                            }
                            alt={
                                Object.keys(newIimage).length === 0
                                    ? user.name
                                    : newIimage.name
                            }
                        />
                    )}
                    <div className={`${styles['edit-profile']}`}>
                        <CameraAltIcon className={`${styles['camera-icon']}`} />
                    </div>
                    <div className={`${styles['edit-input']}`}>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={addImageChangeHandler}
                            multiple={false}
                        />
                    </div>
                </div>
                <p className="title">
                    {user.first_name}{' '}
                    {user.middle_name !== 'middle_name' && user.middle_name}{' '}
                    {user.last_name}
                </p>
                <p className="smaller-text">
                    {user.user_type_id === 3 ? 'Tenant' : 'Landlord'}
                </p>
            </div>

            <form onSubmit={submitHandler} className={`${styles['user-data']}`}>
                <div className={`${styles['user-data-col']}`}>
                    <TextField
                        fullWidth
                        label="First Name"
                        defaultValue={firstName}
                        onChange={firstNameChangeHandler}
                        disabled
                    />

                    <TextField
                        fullWidth
                        label="Middle Name"
                        defaultValue={middleName}
                        onChange={middleNameChangeHandler}
                        // helperText={
                        //     middleName === '' &&
                        //     'Please enter your middle name.'
                        // }
                        error
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue={lastName}
                        onChange={lastNameChangeHandler}
                        disabled
                    />
                </div>

                <div className={`${styles['user-data-col']}`}>
                    <div className={`${styles['phone-number-col']}`}>
                        <TextField
                            fullWidth
                            disabled
                            label="Contact Number"
                            defaultValue={user.phone_number}
                            onChange={numberChangeHandler}
                            helperText={
                                user.phone_number === '' &&
                                'Please enter your cellular number.'
                            }
                            error
                        />

                        <div className={`${styles['change-button']}`}>
                            <Link
                                to={`/change_contact_number`}
                                className={`${styles['change']}`}
                            >
                                CHANGE
                            </Link>
                        </div>
                    </div>

                    <Dropdown
                        fullWidth
                        label="Gender"
                        selected={
                            Number(user.gender) === 0
                                ? 'Male'
                                : Number(user.gender) === 1
                                ? 'Female'
                                : 'Not to specify'
                        }
                        items={[
                            { id: 0, name: 'Male' },
                            { id: 1, name: 'Female' },
                            { id: 2, name: 'Not to specify' },
                        ]}
                        handleSelect={genderChangeHandler}
                        // selectedValue={user.gender}
                    />

                    {user.user_type_id === 2 &&
                        (accountVerification.data &&
                        accountVerification.data.verdict === 1 ? (
                            <div
                                // to="/profile/user_profile/verify/1"
                                className={`${styles['verify-account']}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <ErrorOutlineIcon />
                                <p>Your account is verified</p>
                            </div>
                        ) : accountVerification.data &&
                          accountVerification.data.verdict === null ? (
                            <div
                                // to="/profile/user_profile/verify/1"
                                className={`${styles['verify-account']}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <ErrorOutlineIcon />
                                <p>We are verifying your account.</p>
                            </div>
                        ) : !accountVerification ? (
                            <Link
                                to="/profile/user_profile/verify"
                                className={styles['verify-account']}
                                style={{ textDecoration: 'none' }}
                            >
                                <ErrorOutlineIcon fill="var(--accent-danger)" />
                                <p
                                    style={{
                                        color: 'var(--accent-danger)',
                                    }}
                                >
                                    Verify your account
                                </p>
                            </Link>
                        ) : (
                            <Link
                                to="/profile/user_profile/verify"
                                className={styles['verify-account']}
                                style={{ textDecoration: 'none' }}
                            >
                                <ErrorOutlineIcon fill="var(--accent-danger)" />
                                <p
                                    style={{
                                        color: 'var(--accent-danger)',
                                    }}
                                >
                                    Verify your account
                                </p>
                            </Link>
                        ))}
                </div>

                <div className={`${styles['edit-profile-button']}`}>
                    <PrimaryButton
                        width="100%"
                        isLoading={isSaving}
                        loadingText="Saving"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm
