import React from 'react'
import { styled } from '@mui/material/styles'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

export const TabPanel = (props) => {
    const { children, value, index } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontFamily: 'inherit',
        fontWeight: theme.typography.fontWeightRegular,
        // color: 'red',
        marginRight: theme.spacing(1),
        '&.Mui-focusVisible': {
            color: 'rgba(var(--accent-rgb), 0.32)',
        },
        '&.Mui-selected': {
            color: 'var(--accent)',
            fontWeight: 600,
        },
    })
)

export const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'var(--accent)',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '50%',
        backgroundColor: 'var(--accent)',
        borderRadius: 10,
    },
})

export default StyledTabs
