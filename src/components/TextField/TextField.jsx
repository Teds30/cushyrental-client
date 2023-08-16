import React from 'react'

import TF from '@mui/material/TextField'

const TextField = (props) => {
    const { label = 'Search' } = props

    return <TF label={label} {...props} />
}

export default TextField
