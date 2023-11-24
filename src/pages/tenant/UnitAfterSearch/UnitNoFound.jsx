import React from 'react'
import styles from './UnitNoFound.module.css'
import PrimaryButton from '../../../components/Button/PrimaryButton'
import gif from '../../../assets/searching_the_web.gif'
import { useNavigate } from 'react-router-dom'

const UnitNoFound = () => {
    const navigate = useNavigate()

    return (
        <div className={`${styles['nofound-container']} `}>
            <div className={`${styles['gif-container']} `}>
                <img src={gif} alt="gif" />
            </div>
            <div className={`${styles['nosearchfound-text']} `}>
                <p>No Search Found</p>
            </div>
            <div className={`${styles['lookingfor-text']} `}>
                <p>We couldn't find what your looking for</p>
            </div>
            <div className={`${styles['button-container']} `}>
                <PrimaryButton
                    onClick={() => {
                        navigate('/search')
                    }}
                >
                    Search Again
                </PrimaryButton>
            </div>
        </div>
    )
}

export default UnitNoFound
