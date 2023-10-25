import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { TbChevronLeft, TbDotsVertical } from 'react-icons/tb'

import moment from 'moment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import IconButton from '@mui/material/IconButton'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import rrulePlugin from '@fullcalendar/rrule'
import dayjs from 'dayjs'

import interactionPlugin from '@fullcalendar/interaction' // for selectable
import useHttp from '../../../hooks/http-hook'

import { BsCalendarWeek } from 'react-icons/bs'
import { TbChevronDown } from 'react-icons/tb'

import './MyCalendar.css'
import styles from './MyCalendarComponent.module.css'
import MonthEvents from './MonthEvents'
import SwipeableEdge from './SwipeableEdge'
import AuthContext from '../../../context/auth-context'

const MyCalendar = ({ window }) => {
    const authCtx = useContext(AuthContext)

    const { sendRequest, isLoading } = useHttp()
    const [selectedDate, setSelectedDate] = useState({
        m: moment().month(),
        y: moment().year(),
    })
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedDateEvent, setSelectedDateEvent] = useState(null)
    const [rentals, setRentals] = useState([])
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])

    const [open, setOpen] = useState(true)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const handleCloseDrawer = () => {
        setOpen(false)
        setSelectedDateEvent(null)
        setSelectedEvent(null)
    }

    const calendarRef = useRef()
    const dateRef = useRef()

    useEffect(() => {
        const fetchEvents = async () => {
            let responseData
            try {
                responseData = await sendRequest({
                    url: `${
                        import.meta.env.VITE_BACKEND_LOCALHOST
                    }/api/landlord-rentals/${authCtx.user.id}`,
                })

                if (responseData) {
                    responseData.map((rental) => {
                        setEvents((prev) => [
                            ...prev,
                            {
                                groupId: 'rental_start',
                                title: 'Rental Start',
                                start: rental.date_start,
                                allDay: false,
                                data: rental,
                            },
                            {
                                groupId: 'payment_due_date',
                                title: 'Payment Due Date',
                                rrule: {
                                    freq: 'monthly',
                                    interval: 1,
                                    dtstart: new Date(),
                                    bymonthday: rental.due_date, // This specifies the 28th
                                },
                                data: rental,
                                allDay: false,
                            },
                        ])
                    })
                }

                setRentals(responseData)
            } catch (err) {
                throw err.message
            }
        }

        if (authCtx.user) fetchEvents()
    }, [authCtx.user])

    const handleDateClick = (arg) => {
        const date = arg.dateStr
        // setSelectedDate(date)
        // alert(arg.dateStr)
        const eventDetails = events.filter((event) => {
            let _date
            let selectedDate

            if (event.rrule) {
                _date = event.rrule.bymonthday
                selectedDate = moment(date).date()

                let date_now = moment().format('YYYY-MM-DD')
                // eventDate = new Date(`${date.y}-${date.m}-${_date.bymonthday}`)
                // let eventMonth = eventDate.getMonth()
                // let eventYear = eventDate.getFullYear()
                // return date.m >= moment(date_now).month()

                return (
                    _date === selectedDate &&
                    moment(date).month() >= moment(date_now).month()
                )
            }

            _date = moment(event.start).format('YYYY/MM/DD')
            selectedDate = moment(date).format('YYYY/MM/DD')

            return _date === selectedDate
        })

        setSelectedDateEvent(date)

        if (eventDetails.length > 0) {
            setSelectedEvent(eventDetails)
            setOpen(true)
        }
    }

    useEffect(() => {
        const groupedEvents = events.reduce((acc, event) => {
            const existingEvent = acc.find((e) => {
                if (event.rrule && e.rrule) {
                    return e.rrule.bymonthday === event.rrule.bymonthday
                }
                return e.start === event.start
            })

            if (existingEvent) {
                existingEvent.title += `, ${event.title}`
            } else {
                acc.push({ ...event })
            }

            return acc
        }, [])

        setFilteredEvents(groupedEvents)
    }, [events])

    const handleDateChange = (date) => {
        // setSelectedDate(date)
        dateRef.current.click()
    }

    function renderEventContent(arg) {
        return (
            <div className="event-container">
                {/* <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i> */}
                {arg.event.groupId === 'rental_start' ? (
                    <span className="event-basic"></span>
                ) : (
                    <span className="event-due-date"></span>
                )}
            </div>
        )
    }

    const updateCalendarDate = (selectedMonth, selectedYear) => {
        if (calendarRef.current) {
            // console.log('month:', selectedMonth)
            const calendarApi = calendarRef.current.getApi()
            selectedMonth = moment(selectedMonth, 'DD').format('DD')
            const date = new Date(`${selectedYear}-${selectedMonth}-01`)
            calendarApi.gotoDate(date)
        }
    }

    return (
        <React.Fragment>
            <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: '#fff',
                        color: 'var(--fc-body)',
                        fontFamily: 'Inter',
                        boxShadow: 'none',
                        borderBottom: '1px solid var(--border-color)',
                    }}
                >
                    <Toolbar>
                        <Link to="/landlord-home">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <TbChevronLeft
                                    style={{
                                        color: 'var(--fc-strong)',
                                        fill: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box sx={{ flexGrow: 1 }}>
                            <p className="title">Calendar</p>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={styles['container']}>
                <div className={styles['datepicker']}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            ref={dateRef}
                            label={'Date'}
                            views={['month', 'year']}
                            defaultValue={dayjs(new Date())}
                            onChange={(newValue) => {
                                const m = newValue.format('M')
                                const y = newValue.format('YYYY')
                                setSelectedDate({
                                    m: parseInt(m - 1),
                                    y: parseInt(y),
                                })
                                updateCalendarDate(m, y)
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles['title']}>
                    <div className={styles['month-year']}>
                        <div className={styles['year']}>
                            <p className="caption">
                                {moment(selectedDate.y, 'Y').format('YYYY')}
                            </p>
                        </div>

                        <div
                            className={styles['month']}
                            onClick={handleDateChange}
                        >
                            <h2>
                                {selectedDate &&
                                    `${moment(selectedDate.m + 1, 'M').format(
                                        'MMMM'
                                    )}`}
                            </h2>
                            <IconButton
                                size="medium"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDateChange}
                            >
                                <TbChevronDown
                                    style={{ fill: 'transparent' }}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={styles['calendar-container']}>
                    <FullCalendar
                        className={styles['calendar']}
                        ref={calendarRef}
                        headerToolbar={{
                            left: '',
                            center: '',
                            right: '',
                        }}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            rrulePlugin,
                        ]}
                        initialView="dayGridMonth"
                        dayHeaderFormat={{ weekday: 'narrow' }}
                        height={'auto'}
                        events={filteredEvents}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventContent={renderEventContent}
                    />
                </div>
                <MonthEvents events={events} date={selectedDate} />

                {selectedEvent && (
                    <SwipeableEdge
                        open={open}
                        onOpen={toggleDrawer}
                        events={selectedEvent}
                        date={selectedDateEvent}
                        closeDrawer={handleCloseDrawer}
                    />
                )}
            </div>
        </React.Fragment>
    )
}

export default MyCalendar
