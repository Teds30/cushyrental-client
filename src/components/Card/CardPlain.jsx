import styles from './CardPlain.module.css'

const CardPlain = (props) => {
    const { filled = true } = props

    let filledStyle = ''
    if (filled === true) {
        filledStyle = styles['card-fill']
    }
    return (
        <div className={`${styles.card} ${filledStyle}`}>{props.children}</div>
    )
}

export default CardPlain
