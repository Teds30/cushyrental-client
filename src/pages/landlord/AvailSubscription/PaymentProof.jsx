import React, { Fragment, useRef, useState } from 'react'

import { HiPhoto } from 'react-icons/hi2'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import BorderlessButton from '../../../components/Button/BorderlessButton'
import { BsArrowRight, BsInfoCircle } from 'react-icons/bs'

import useImageManager from '../../../hooks/data/image-hook'
import useSubscriptionManager from '../../../hooks/data/subscriptions-hooks'

import styles from './PaymentProof.module.css'
import { CircularProgress } from '@mui/material'

const PaymentProof = (props) => {
    const { form, setForm, handleBack, handleNext } = props
    const [uploadedFile, setUploadedFile] = useState(form.uploadedProof)
    const [uploadError, setUploadError] = useState(null)
    const fileRef = useRef()
    const { uploadImage, isLoading } = useImageManager()
    const { subscribeUnit } = useSubscriptionManager()

    const checkFileSize = (file) => {
        const fileSizeInMB = file.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            setUploadError(
                'The file size is too large. Please upload a file that is smaller than 5MB.'
            )
            return false
        }

        return true
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]

        const isImage = file.type.split('/')[0] === 'image' ?? false

        if (!isImage) {
            setUploadError('The uploaded file is not a valid image.')
            return
        }

        if (!checkFileSize(file)) {
            setUploadError(
                'The image size exceeds the maximum allowed size of 5 MB.'
            )
            return
        }

        setUploadedFile(file)
        setUploadError(null)
        setForm((prev) => {
            return {
                ...prev,
                uploadedProof: file,
            }
        })

        return []
    }

    const handleSubmit = async () => {
        try {
            const res = await uploadImage({
                file: form.uploadedProof,
                name: 'proof',
                path: 'proof_of_payment',
            })

            if (res.error) {
                setUploadError(res.error)
                return
            }

            const subscribeRes = await subscribeUnit({
                unit_id: form.selectedUnit.unitId,
                subscription_id: 1,
                pop_image_id: res.image.id,
                account_name: form.gcash_name,
                account_number: form.gcash_account,
                email_address: form.email_address,
            })

            if (subscribeRes) {
                handleNext()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const isValid = !!form.uploadedProof

    return (
        <div className={styles['container']}>
            <p>
                &emsp;&emsp; Please attach a photo of your proof of payment,
                which should be a clear photo of the receipt from your GCash
                transaction. This will allow us to verify your payment and
                activate your subscription.
            </p>
            <div className={styles['card-container']}>
                <div className={styles['card']}>
                    <h3>Proof of Payment</h3>
                    <div
                        className={styles['identification-card']}
                        onClick={() => fileRef.current.click()}
                    >
                        {uploadedFile && !isLoading && (
                            <div className={styles['uploaded-preview']}>
                                <img
                                    src={URL.createObjectURL(uploadedFile)}
                                    alt="uploaded_image"
                                />
                                <span>Click to upload another image</span>
                            </div>
                        )}
                        {!uploadedFile && !isLoading && (
                            <Fragment>
                                <div className={styles.outer}>
                                    <div className={styles.inner}>
                                        <HiPhoto
                                            className={`${styles['card-icon-one']}`}
                                        />
                                        <BsFillArrowUpSquareFill
                                            className={`${styles['card-icon-two']}`}
                                        />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p className="title">
                                        Click here to upload image
                                    </p>
                                    <p className="smaller-text">
                                        Maximum size is 5MB
                                    </p>
                                </div>
                            </Fragment>
                        )}
                        {isLoading && (
                            <div className={styles['uploading-state']}>
                                <CircularProgress
                                    sx={{ color: 'var(--accent)' }}
                                />
                                <p className="title">Uploading image</p>
                            </div>
                        )}
                        <input
                            ref={fileRef}
                            onChange={handleFileUpload}
                            type="file"
                            style={{ display: 'none' }}
                            accept=".png, .jpg, .jpeg"
                            className={`${styles['add-photo']}`}
                        />
                    </div>
                    {uploadError && (
                        <div className={styles['uploaded-error']}>
                            <BsInfoCircle
                                size={24}
                                style={{ fill: '#ff4949' }}
                            />
                            {uploadError}
                        </div>
                    )}

                    <p>
                        Once we have received and verified your payment and
                        information, you will be notified indicating that your
                        subscription has been activated. Please note that it may
                        take up to 24 hours for us to process your subscription.
                    </p>
                </div>
            </div>
            <div className={styles['actions']}>
                <BorderlessButton onClick={handleBack}>Back</BorderlessButton>
                <PrimaryButton
                    width="100%"
                    rightIcon={<BsArrowRight strokeWidth={1} />}
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}

export default PaymentProof
