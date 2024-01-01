import React from 'react'

import { Backdrop, Box, Card, CardActions, CardContent } from '@mui/material'
import BorderlessButton from '../../../../components/Button/BorderlessButton'
import PrimaryButton from '../../../../components/Button/PrimaryButton'

import brand_logo from '../../../../assets/cushyrental.svg'

const DashboardTour = (props) => {
    const { open, handleClose, setIsTourOpen } = props
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
        >
            <Card sx={{ maxWidth: 360, borderRadius: '8px' }}>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        <img src={brand_logo} alt="" />
                    </Box>
                    <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>
                        Welcome to CushyRental
                    </h3>
                    <p>
                        Innovative features are included catering your needs for
                        record keeping and reach broader audience.
                    </p>
                </CardContent>
                <CardActions>
                    <BorderlessButton>Explore by myself</BorderlessButton>
                    <PrimaryButton
                        onClick={() => {
                            setIsTourOpen(true)
                        }}
                    >
                        Take the tour
                    </PrimaryButton>
                </CardActions>
            </Card>
        </Backdrop>
    )
}

export default DashboardTour
