import styles from './CardShadow.module.css'

const CardShadow = (props) => {
    const { filled = true } = props

    let filledStyle = ''
    if (filled === true) {
        filledStyle = styles['card-fill']
    }
    return (
        <div className={`${styles.card} ${filledStyle}`}>{props.children}</div>
    )
}

export default CardShadow
