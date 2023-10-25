import CreateUnitForm from './CreateUnitForm'

import styles from './CreateUnit.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { FiChevronLeft } from 'react-icons/fi'

const CreateUnit = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Link
                    to={`/manage_unit`}
                    className={`${styles['link-button']}`}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <FiChevronLeft
                            style={{
                                color: 'var(--fc-strong)',
                                fill: 'transparent',
                            }}
                        />
                    </IconButton>
                    <span>Back</span>
                </Link>
            </Box>
            <div className={`${styles['container-title']}`}>
                <h1>Create Unit</h1>
            </div>

            <div className={`${styles['main-container']}`}>
                <CreateUnitForm />
            </div>
        </div>
    )
}

export default CreateUnit
