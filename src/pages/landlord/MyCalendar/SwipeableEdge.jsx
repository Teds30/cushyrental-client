import React from 'react'

import moment from 'moment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const drawerBleeding = 32
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'var(--bg-layer1)',
}))

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: 'var(--bg-layer4)',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))
const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

import styles from './MonthEvents.module.css'

const SwipeableEdge = (props) => {
    const { open, onOpen, events, date, closeDrawer } = props

    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(60% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={closeDrawer}
                onOpen={onOpen(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        height: drawerBleeding,
                        backgroundColor: 'var(--bg-layer1)',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <h2>{moment(date).format('MMMM D')}</h2>
                    <div className={styles['events-container']}>
                        {events.map((event, index) => {
                            const box_color =
                                event.groupId === 'rental_start'
                                    ? styles['event-date-rs']
                                    : styles['event-date-pdd']
                            const border_color =
                                event.groupId === 'rental_start'
                                    ? styles['event-date-border-rs']
                                    : styles['event-date-border-pdd']
                            return (
                                <div
                                    className={`${styles['event']} ${border_color}`}
                                    key={index}
                                >
                                    <div
                                        className={`${styles['event-date']} ${box_color}`}
                                    >
                                        <div className={styles['date']}>
                                            {event.start &&
                                                moment(event.start).format(
                                                    'DD'
                                                )}
                                        </div>
                                        <div className={styles['date']}>
                                            {event.rrule &&
                                                event.rrule.bymonthday}
                                        </div>
                                        <div className={styles['month']}>
                                            {event.start &&
                                                moment(event.start)
                                                    .format('MMM')
                                                    .toUpperCase()}
                                        </div>
                                        <div className={styles['month']}>
                                            {event.rrule &&
                                                moment(date)
                                                    .format('MMM')
                                                    .toUpperCase()}
                                        </div>
                                    </div>
                                    <div className={styles['event-details']}>
                                        <p className="title">{event.title}</p>
                                        <p
                                            style={{ color: 'var(--fc-body)' }}
                                        >{`${event.data.user.first_name} ${event.data.user.last_name}`}</p>
                                        {event.groupId ===
                                        'payment_due_date' ? (
                                            <p
                                                style={{
                                                    color: 'var(--fc-body)',
                                                }}
                                            >
                                                ₱
                                                {event.data.monthly_amount.toLocaleString(
                                                    'en-US',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </StyledBox>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default SwipeableEdge
