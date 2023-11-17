import React, { useEffect, useState } from 'react'

import useImageManager from '../../../hooks/data/image-hook'
const PromoteUnitImage = (props) => {
    const { image } = props

    const { fetchImage } = useImageManager()
    const [imageBlob, setImageBlob] = useState()

    useEffect(() => {
        const loadData = async () => {
            const res = await fetchImage(image.replace('images/', ''))
            setImageBlob(res)
        }

        loadData()
    }, [])

    return <img src={imageBlob} alt="" />
}

export default PromoteUnitImage
