import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ChipOutlined from '../../../components/Chips/ChipOutlined'

import styles from './SearchUnit.module.css'

const Rules = (props) => {
    const { onRule, rules, ruleValue } = props

    const facilityHandler = (value) => {
        onRule(value)
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
                    Rules
                </p>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
                <div className={`${styles['filter-col']}`}>
                    <div className={`${styles['hr']}`}></div>
                    <ChipOutlined
                        items={rules}
                        onChipValue={facilityHandler}
                        selected={ruleValue}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default Rules
