import { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ChipOutlined from '../../../components/Chips/ChipOutlined'

import styles from './SearchUnit.module.css'

const genders = [
    {
        id: '1',
        name: 'Male',
        icon: 'male.svg',
    },
    {
        id: '2',
        name: 'Female',
        icon: 'female.svg',
    },
    {
        id: '3',
        name: 'All',
        icon: 'allgender.svg',
    },
]

const Gender = (props) => {
    const { onGender, genderValue = [] } = props
    const [gender, setGender] = useState(genderValue)

    const genderHandler = (value) => {
        setGender(value[0])
        onGender(value[0])
    }

    return (
        <Accordion
            sx={{
                border: 'none',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.80)',
                boxShadow: 'none',
                padding: '0',
            }}
        >
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    padding: '0',
                    margin: '0',
                    '& MuiAccordionSummary-content': {
                        margin: '0',
                    },
                }}
            >
                <p
                    className="title"
                    style={{ color: 'var(--fc-body)', fontWeight: '700' }}
                >
                    Gender
                </p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
                <div className={`${styles['filter-col']}`}>
                    <div className={`${styles['hr']}`}></div>
                    <ChipOutlined
                        selected={gender}
                        items={genders}
                        button="radio"
                        onChipValue={genderHandler}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default Gender
