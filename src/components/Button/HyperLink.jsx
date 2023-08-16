import React from 'react'

import styles from './HyperLink.module.css'

const HyperLink = (props) => {
    const { children, href, underlined = false } = props

    const underlinedStyle = underlined ? styles.underlined : ''

    return (
        <a href={href} className={`${styles.link} ${underlinedStyle}`}>
            {children}
        </a>
    )
}

export default HyperLink
