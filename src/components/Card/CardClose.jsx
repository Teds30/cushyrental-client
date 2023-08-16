import { useState, Fragment } from 'react'
import styles from './CardClose.module.css'
import { AiOutlineClose } from 'react-icons/ai'

const CardClose = (props) => {
    const { filled = true } = props

    let filledStyle = ''
    if (filled === true) {
        filledStyle = styles['card-fill']
    }
    const [showCard, setShowCard] = useState(true)

    const showCardHandler = () => {
        setShowCard(true)
    }

    const closeCardHandler = () => {
        setShowCard(false)
    }

    return (
        <Fragment>
            {showCard && (
                <div
                    className={`${styles.card} ${filledStyle}`}
                    showCard={showCardHandler}
                >
                    <button onClick={closeCardHandler}>
                        <AiOutlineClose size={12} color="#fff" />
                    </button>
                    {props.children}
                </div>
            )}
        </Fragment>
    )
}

export default CardClose
