import React, { useEffect, useRef } from 'react'

import { motion, useAnimation, useInView } from 'framer-motion'

import CountUp, { useCountUp } from 'react-countup'

const AnimatedNumber = ({
    children,
    transition = { duration: 0.5, delay: 0.25 },
    style,
    classes,
    number,
    name,
}) => {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const mainControls = useAnimation()

    // useEffect(() => {
    //     if (isInView) {
    //         mainControls.start('visible')
    //         console.log(isInView)
    //     }
    // }, [isInView])

    // useCountUp({
    //     ref: name,
    //     end: number,
    //     enableScrollSpy: true,
    //     scrollSpyDelay: 1500,
    // })

    return (
        <motion.div
            className={classes}
            ref={titleRef}
            style={style}
            // whileInView={'visible'}
            initial="hidden"
            transition={transition}
            // animate={mainControls}
        >
            {isInView && <CountUp end={number} duration={2} />}

            {/* <CountUp end={number} enableScrollSpy /> */}
            <br />
            <span id={name} />
        </motion.div>
    )
}

export default AnimatedNumber
