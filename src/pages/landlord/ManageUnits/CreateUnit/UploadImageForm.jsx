import { useState, useContext } from 'react'

import BorderlessButton from '../../../../components/Button/BorderlessButton'
import PrimaryButton from '../../../../components/Button/PrimaryButton'
import SecondaryButton from '../../../../components/Button/SecondaryButton'
import CreateUnitContext from '../../../../context/create-unit-context'
import useUnitManager from '../../../../hooks/data/units-hook'
import AuthContext from '../../../../context/auth-context'
import useNotistack from '../../../../hooks/notistack-hook'

import styles from './CreateUnit.module.css'
import EastIcon from '@mui/icons-material/East'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import MenuButton from '../../../../components/Menu/MenuButton'

const UploadImageForm = (props) => {
    const { onNext, onBack } = props
    const { createUnit } = useUnitManager()
    const imageData = []
    const { notify } = useNotistack()

    const createUnitCtx = useContext(CreateUnitContext)
    const userCtx = useContext(AuthContext)
    const uploadImageDetails =
        createUnitCtx.unitData.images === undefined
            ? []
            : createUnitCtx.unitData.images
    const [isSaving, setIsSaving] = useState(false)

    const [unitImages, setUnitImages] = useState(uploadImageDetails)

    const addImageChangeHandler = (event) => {
        const selectedImage = event.target.files[0]

        if (selectedImage && selectedImage.size > 20 * 1024 * 1024) {
            notify('Selected image is greater than 20MB', 'info')
            return
        }

        setUnitImages([...unitImages, selectedImage])
    }

    const removeHandler = (id) => {
        const newUnitImages = unitImages.filter((image, index) => index !== id)
        // setUnitImages(newUnitImages);
        if (newUnitImages.length === 0) {
            setUnitImages([])
            return
        }

        setUnitImages(newUnitImages)
    }

    const locationDraft = () => {
        if (unitImages) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                images: unitImages,
            })
        }
    }
    const backHandler = (event) => {
        event.preventDefault()

        locationDraft()

        onBack()
    }

    const handleFileUpload = async (image, index) => {
        const formData = new FormData()

        formData.append('image', image)
        formData.append('name', image.name)
        formData.append('path', 'images')

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_LOCALHOST}/api/image-upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )

            const data = await res.json()

            if (index === 0) {
                imageData.push({ image_id: data.image.id, is_thumbnail: 1 })
            } else {
                imageData.push({ image_id: data.image.id, is_thumbnail: 0 })
            }

            if (imageData.length === unitImages.length) {
                try {
                    const toSave = {
                        ...createUnitCtx.unitData,
                        images: imageData,
                        landlord_id: userCtx.user.id,
                        target_gender: Number(
                            createUnitCtx.unitData.target_gender[0]
                        ),
                    }
                    console.log(toSave)
                    const res = await createUnit(toSave)
                    setIsSaving(false)
                    createUnitCtx.onReset()
                    onNext()
                } catch (err) {}
            }
        } catch (err) {}
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if (unitImages.length < 3) {
            return
        }

        setIsSaving(true)

        unitImages.forEach((image, index) => {
            handleFileUpload(image, index)
        })
    }

    const unitImagesContent =
        unitImages.length !== 0 &&
        unitImages.map((image, index) => {
            return (
                <div key={index} className={`${styles['upload-image-size']}`}>
                    {index === 0 && (
                        <div className={styles.thumbnail}>
                            <p className="pre-title">THUMBNAIL</p>
                        </div>
                    )}
                    <div className={styles.menu}>
                        <MenuButton
                            options={['Remove']}
                            id={index}
                            onRemove={removeHandler}
                        />
                    </div>
                    <img src={URL.createObjectURL(image)} alt="CushyRental" />
                </div>
            )
        })

    return (
        <form
            className={`${styles['basic-details-form']}`}
            onSubmit={submitHandler}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <div className={`${styles.title}`}>
                    Showcase your unit's layout
                </div>
                <div className="caption">
                    Upload at least 3 images of your unit.
                </div>
            </div>

            <div className={`${styles['upload-image']}`}>
                {unitImagesContent}
            </div>

            <div className={`${styles['upload-image-button']}`}>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={addImageChangeHandler}
                    multiple={false}
                />
                <SecondaryButton width="100%" leftIcon={<AddIcon />}>
                    {unitImages.length >= 1 ? 'Add More' : 'Add Image'}
                </SecondaryButton>
            </div>

            <div className={`${styles['basic-details-button']}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton
                    leftIcon={<CheckCircleOutlineIcon />}
                    isLoading={isSaving}
                    loadingText="Finishing"
                >
                    Finish
                </PrimaryButton>
            </div>
        </form>
    )
}

export default UploadImageForm
