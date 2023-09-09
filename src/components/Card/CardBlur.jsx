import styles from './CardBlur.module.css'

const CardBlur = (props) => {
    const { filled = true } = props

    let filledStyle = ''
    if (filled === true) {
        filledStyle = styles['card-fill']
    }
    return (
        <div {...props} className={`${styles.card} ${filledStyle}`}>{props.children}</div>
    )
}

export default CardBlur
