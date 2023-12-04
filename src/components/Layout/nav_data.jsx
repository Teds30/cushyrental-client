import { Link } from 'react-router-dom'
import { PiHouseFill, PiHouseLight } from 'react-icons/pi'
import { BiUser, BiSolidUser } from 'react-icons/bi'
import {
    BsChatSquare,
    BsChatSquareFill,
    BsBell,
    BsBellFill,
} from 'react-icons/bs'

const nav_data = [
    {
        name: 'Home',
        icon: <PiHouseLight style={{ fill: 'inherit' }} size={24} />,
        selectedIcon: <PiHouseFill style={{ fill: 'inherit' }} size={24} />,
        redirect_url: '/',
    },
    {
        name: 'Chats',
        icon: (
            <BsChatSquare style={{ fill: 'inherit' }} color="red" size={24} />
        ),
        selectedIcon: (
            <BsChatSquareFill style={{ fill: 'inherit' }} size={24} />
        ),
        redirect_url: '/chats',
    },
    {
        name: 'Notification',
        icon: <BsBell style={{ fill: 'inherit' }} size={24} />,
        selectedIcon: <BsBellFill style={{ fill: 'inherit' }} size={24} />,
        redirect_url: '/notifications',
    },
    {
        name: 'Profile',
        icon: (
            <BiUser
                style={{
                    fill: 'inherit',
                }}
                size={24}
            />
        ),
        selectedIcon: <BiSolidUser style={{ fill: 'inherit' }} size={24} />,
        redirect_url: '/profile',
    },
]

export default nav_data
