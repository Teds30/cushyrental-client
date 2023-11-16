import React, { useEffect, useRef } from 'react'

import { motion, useAnimation, useInView } from 'framer-motion'

import CountUp from 'react-countup'

const AnimatedElement = ({
    children,
    transition = { duration: 0.5, delay: 0.25 },
    fromY = 50,
    style,
    animation = 'slide-up',
    classes,
    showOnce = false,
}) => {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: showOnce })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
            console.log(isInView)
        }
    }, [isInView])

    let variants
    if (animation === 'slide-up') {
        variants = {
            hidden: { opacity: 0, y: fromY },
            visible: { opacity: 1, y: 0 },
        }
    } else if (animation === 'zoom-in') {
        variants = {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
        }
    }

    return (
        <motion.div
            className={classes}
            ref={titleRef}
            style={style}
            variants={variants}
            whileInView={!showOnce && 'visible'}
            initial="hidden"
            transition={transition}
            animate={mainControls}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedElement
