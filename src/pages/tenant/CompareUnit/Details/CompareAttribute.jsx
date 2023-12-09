import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

import styles from '../UnitComparing.module.css'

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    maxWidth: '300px !important',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
}))
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharpIcon
                sx={{ color: 'var(--accent)', fontSize: '0.9rem' }}
            />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'none',
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    padding: '0',
    margin: '0',
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    textAlign: 'start',
}))

const CompareAttribute = (props) => {
    const { data, attr } = props

    const { title = '{TITLE}', desc = '{DESC}' } = attr

    let content = data.unit?.map((unit, index) => {
        return (
            <div className={styles['segment-container']} key={index}>
                <div className={styles['segment-content']}>
                    <div className={styles['attribute-title']}>
                        <p className="title">{title}</p>
                        <p className="caption" style={{ textAlign: 'center' }}>
                            {desc}
                        </p>
                        {unit.attributes.length > 0 ? (
                            <div className={styles['attributes-container']}>
                                {unit.attributes.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles['attribute-icon']}
                                            dangerouslySetInnerHTML={{
                                                __html: item.iconBlob,
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <p
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                No {title.toLowerCase()}.
                            </p>
                        )}
                    </div>
                    {unit.attributes.length > 0 && (
                        <Accordion>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${unit.id}${index}d-content`}
                                id={`panel${unit.id}${index}d-header`}
                            >
                                <p
                                    style={{
                                        color: 'var(--accent)',
                                        marginRight: '4px',
                                    }}
                                >
                                    Show in details
                                </p>
                            </AccordionSummary>
                            <AccordionDetails>
                                {unit.attributes.map((item, index) => {
                                    return <li key={index}>{item.name}</li>
                                })}
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
            </div>
        )
    })
    return content
}

export default CompareAttribute
