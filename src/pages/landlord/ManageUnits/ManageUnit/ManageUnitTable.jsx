import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import {
    StyledTabs,
    StyledTab,
    TabPanel,
} from '../../../../components/Tabs/Tabs'
import FloatingActionButton from '../../../../components/Button/FloatingActionButton'
import Units from './Units'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

import styles from './ManageUnit.module.css'
import { MdAdd } from 'react-icons/md'
import Tour from 'reactour'

const steps = [
    {
        selector: '#addunit',
        content: 'Create a listing for your unit.',
    },
]

const ManageUnitTabs = (props) => {
    const {
        userUnits = [],
        onDeleteUnit,
        isTourOpen: isTourOpenProp = false,
    } = props

    const [isTourOpen, setIsTourOpen] = useState(isTourOpenProp)

    console.log('isTourOpen2: ', isTourOpen)
    const [value, setValue] = useState(0)
    // const [userUnitPending, setUserUnitPending] = useState(
    //     userUnits.filter(
    //         (unit) => unit.request_status === 0 && unit.is_listed === 0
    //     )
    // );

    const userUnitPending = userUnits.filter(
        (unit) => unit.request_status === 0 && unit.is_listed === 0
    )

    const [userUnitListed, setUserUnitListed] = useState(
        userUnits.filter(
            (unit) =>
                unit.is_listed === 1 &&
                unit.request_status !== 2 &&
                unit.request_status !== 0
        )
    )
    const [userUnitUnlisted, setUserUnitUnlisted] = useState(
        userUnits.filter(
            (unit) =>
                unit.is_listed === 0 &&
                unit.request_status !== 2 &&
                unit.request_status !== 0
        )
    )
    const [userUnitRejected, setUserUnitRejected] = useState(
        userUnits.filter((unit) => {
            return unit.request_status === 2 && 3
        })
    )

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const deleteUnitHandler = (id) => {
        onDeleteUnit(id)
    }

    return (
        <Fragment>
            <Tour
                steps={steps}
                isOpen={isTourOpen}
                onRequestClose={() => setIsTourOpen(false)}
                showButtons={false}
                showNumber={false}
                showNavigation={false}
                showNavigationNumber={false}
                rounded={10}
            />

            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    background: 'var(--bg-layer1)',
                    marginTop: '56px',
                }}
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: 'none' }}
                        label="All"
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: 'none' }}
                        label={
                            userUnitListed.length === 0 ? (
                                'Listed'
                            ) : (
                                <div className={`${styles['tab-child']}`}>
                                    Listed
                                    <div>{userUnitListed.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: 'none' }}
                        label={
                            userUnitUnlisted.length === 0 ? (
                                'Unlisted'
                            ) : (
                                <div className={`${styles['tab-child']}`}>
                                    Unlisted
                                    <div>{userUnitUnlisted.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: 'none' }}
                        label={
                            userUnitPending.length === 0 ? (
                                'Pending'
                            ) : (
                                <div className={`${styles['tab-child']}`}>
                                    Pending
                                    <div>{userUnitPending.length}</div>
                                </div>
                            )
                        }
                    />
                    <StyledTab
                        disableRipple
                        sx={{ textTransform: 'none' }}
                        label={
                            userUnitRejected.length === 0 ? (
                                'Rejected'
                            ) : (
                                <div className={`${styles['tab-child']}`}>
                                    Rejected
                                    <div>{userUnitRejected.length}</div>
                                </div>
                            )
                        }
                    />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                {userUnits.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No units posted</p>
                ) : (
                    <Units
                        userUnits={userUnits}
                        onDeleteUnit={deleteUnitHandler}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {userUnitListed.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No listed units</p>
                ) : (
                    <Units userUnits={userUnitListed} />
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {userUnitUnlisted.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No unlisted units</p>
                ) : (
                    <Units userUnits={userUnitUnlisted} />
                )}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {userUnitPending.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No pending units</p>
                ) : (
                    <Units
                        userUnits={userUnitPending}
                        onDeleteUnit={deleteUnitHandler}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {userUnitRejected.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No rejected units</p>
                ) : (
                    <Units userUnits={userUnitRejected} />
                )}
            </TabPanel>
            <div className={`${styles['create-unit-button']}`}>
                <div className={`${styles['button']}`} id="addunit">
                    <Link to="/manage_unit/create_unit">
                        <Fab
                            style={{ background: 'var(--accent)' }}
                            aria-label="add"
                        >
                            <AddIcon sx={{ color: 'white' }} />
                        </Fab>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ManageUnitTabs
