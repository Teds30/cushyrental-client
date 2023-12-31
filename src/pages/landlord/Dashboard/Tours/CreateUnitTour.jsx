import { Backdrop, Box, Card, CardActions, CardContent } from '@mui/material'
import React from 'react'
import BorderlessButton from '../../../../components/Button/BorderlessButton'
import PrimaryButton from '../../../../components/Button/PrimaryButton'

import building from '../../../../assets/building.svg'

const CreateUnitTour = (props) => {
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
                        <img src={building} alt="" width={100} />
                    </Box>
                    <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>
                        List your Unit!
                    </h3>
                    <p>
                        List your unit now to attract potential tenants! Fill in
                        the details, upload eye-catching photos, and let the
                        renting begin. Your perfect tenant might just be a click
                        away.
                    </p>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BorderlessButton>Maybe Later</BorderlessButton>
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

export default CreateUnitTour
