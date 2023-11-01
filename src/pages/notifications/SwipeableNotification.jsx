import React from 'react'
import { ListItem, ListItemText } from '@mui/material'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import styles from './Notifications.module.css'
import Notification from './Notification'

import { AiFillDelete } from 'react-icons/ai'

const trailingActions = ({ onDelete }) => (
    <TrailingActions>
        <SwipeAction
            destructive={true}
            onClick={onDelete}
            className={styles['action']}
        >
            <span style={{ alignSelf: 'center' }}>Delete</span>
        </SwipeAction>
    </TrailingActions>
)

const SwipeableNotification = ({
    onVisit,
    onDelete,
    data = {},
    is_read = false,
}) => {
    return (
        <SwipeableList>
            <SwipeableListItem
                onClick={() => {
                    onVisit({ url: data.redirect_url, id: data.id })
                }}
                trailingActions={trailingActions({ onDelete })}
            >
                <Notification data={data} is_read={!!data.is_read} />
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default SwipeableNotification
