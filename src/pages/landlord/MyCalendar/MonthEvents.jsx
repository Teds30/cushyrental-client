import React, { useEffect, useState } from 'react'

import moment from 'moment'
import styles from './MonthEvents.module.css'

const MonthEvents = (props) => {
    const { events, date } = props

    console.log(events);

    const [filteredEvents, setFilteredEvents] = useState([])

    useEffect(() => {
        // filteredEvents.filter((event) => {
        //     const eventDate = new Date(event.start)
        //     const eventMonth = eventDate.getMonth() + 1 // Adding 1 because getMonth() returns 0-based months
        //     const eventYear = eventDate.getFullYear()
        //     return eventMonth === selectedMonth && eventYear === selectedYear
        // })
    }, [filteredEvents])

    useEffect(() => {
        const filtered = events.filter((event) => {
            let eventDate
            eventDate = new Date(event.start)
            if (event.rrule) {
                let date_now = moment().format('YYYY-MM-DD')
                eventDate = new Date(
                    `${date.y}-${date.m}-${event.rrule.bymonthday}`
                )
                let eventMonth = eventDate.getMonth()
                let eventYear = eventDate.getFullYear()
                return date.m >= moment(date_now).month()
            }
            let eventMonth = eventDate.getMonth()
            let eventYear = eventDate.getFullYear()
            return eventMonth === date.m && eventYear === date.y
        })
        setFilteredEvents(filtered)
    }, [events, date])

    return (
        <div className={styles['container']}>
            <h3>Events</h3>
            {filteredEvents &&
                filteredEvents.map((event, index) => {
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
                                        moment(event.start).format('DD')}
                                </div>
                                <div className={styles['date']}>
                                    {event.rrule && event.rrule.bymonthday}
                                </div>
                                <div className={styles['month']}>
                                    {event.start &&
                                        moment(event.start)
                                            .format('MMM')
                                            .toUpperCase()}
                                </div>
                                <div className={styles['month']}>
                                    {event.rrule &&
                                        moment(date.m + 1, 'MM')
                                            .format('MMM')
                                            .toUpperCase()}
                                </div>
                            </div>
                            <div className={styles['event-details']}>
                                <p className="title">{event.title}</p>
                                <p>{`${event.data.user.first_name} ${event.data.user.last_name}`}</p>
                                {event.groupId === 'payment_due_date' ? (
                                    <p>
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
    )
}

export default MonthEvents
