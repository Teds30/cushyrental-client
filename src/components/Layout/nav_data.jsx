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
    },
    {
        name: 'Chats',
        icon: (
            <Link
                to="/chats"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsChatSquare
                    style={{ fill: 'inherit' }}
                    color="red"
                    size={24}
                />
            </Link>
        ),
        selectedIcon: (
            <Link
                to="/chats"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsChatSquareFill style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
    },
    {
        name: 'Notification',
        icon: (
            <Link
                to="/notifications"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsBell style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
        selectedIcon: (
            <Link
                to="/notifications"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BsBellFill style={{ fill: 'inherit' }} size={24} />
            </Link>
        ),
    },
    {
        name: 'Profile',
        icon: (
            <Link
                to="/profile"
                style={{
                    display: 'flex',
                    justifyContent: 'centers',
                    alignItems: 'center',
                }}
            >
                <BiUser
                    style={{
                        fill: 'inherit',
                    }}
                    size={24}
                />
            </Link>
        ),

        selectedIcon: <BiSolidUser style={{ fill: 'inherit' }} size={24} />,
    },
]

export default nav_data
