import CreateUnitForm from './CreateUnitForm'

import styles from './CreateUnit.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { FiChevronLeft } from 'react-icons/fi'
import { useEffect } from 'react'

const CreateUnit = () => {
    const navigate = useNavigate()

    const customBackFunction = () => {
        // Implement your custom logic here
        console.log('Custom back button function triggered')
        // You can navigate to a different route, go back multiple steps, etc.
        // For example, go back two steps:
        navigate(-2)
    }

    // Change the function to your custom function
    const handleBackButtonClick = () => {
        customBackFunction()
    }

    // Override the default behavior of the browser's back button
    useEffect(() => {
        const handlePopstate = () => {
            customBackFunction()
        }

        console.log('[p')
        window.addEventListener('popstate', handlePopstate)

        return () => {
            window.removeEventListener('popstate', handlePopstate)
        }
    }, []) // Ensure the effect runs only once during component mount and unmount

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
                    <span
                        style={{
                            color: 'var(--fc-strong)',
                            fontSize: '16px',
                            fontWeight: '700',
                        }}
                    >
                        Back
                    </span>
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
