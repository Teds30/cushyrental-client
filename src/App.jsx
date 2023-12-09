import React, {
    useState,
    useEffect,
    useContext,
    Fragment,
    useCallback,
    Suspense,
} from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import CreateAccount from './pages/auth/CreateAccount/CreateAccount'
import SignInPage from './pages/Login/SignInPage'
import ForgotPasswordMain from './pages/Login/ForgotPasswordMain'
const Conversation = React.lazy(() => import('./pages/chat/Conversation'))

// import Conversation from './pages/chat/Conversation'
import Chats from './pages/chat/Chats'
import MyUnit from './pages/landlord/MyUnit/MyUnit'
import CreateUnit from './pages/landlord/ManageUnits/CreateUnit/CreateUnit'
import ManageRenters from './pages/landlord/ManageRenters/ManageRenters'
import ManagePendingInquiries from './pages/landlord/ManageRenters/ManagePendingInquiries'
import Location from './pages/landlord/ManageUnits/CreateUnit/Location/Location'
import ManageUnit from './pages/landlord/ManageUnits/ManageUnit/ManageUnit'
import ManageTenants from './pages/landlord/ManageRenters/ManageTenants'
import UnitData from './pages/landlord/ManageUnits/EditUnit/UnitData'
import UserAmenities from './pages/landlord/ManageUnits/EditUnit/Features/Amenities/UserAmenities'
import UserFacilities from './pages/landlord/ManageUnits/EditUnit/Features/Facilities/UserFacilities'
import UserInclusions from './pages/landlord/ManageUnits/EditUnit/Features/Inclusions/UserInclusions'
import UserRules from './pages/landlord/ManageUnits/EditUnit/Features/Rules/UserRules'
import MyCalendar from './pages/landlord/MyCalendar/MyCalendar'
import UnitImageData from './pages/landlord/ManageUnits/EditUnit/EditUnitImage/UnitImageData'
import Rules from './pages/Rules'
import Dashboard from './pages/landlord/Dashboard/Dashboard'
import Report from './pages/Report/Report'
import ViewProfile from './pages/tenant/ViewLandlordProfile/ViewProfile'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'
import Subscriptions from './pages/landlord/Subscriptions/Subscriptions'
import ManageSubscriptions from './pages/landlord/ManageSubscriptions/ManageSubscriptions'
import AccountVerification from './pages/landlord/LandProfile/AccountVerification'
import AvailSubscription from './pages/landlord/AvailSubscription/AvailSubscription'
import RentedUnitMain from './pages/tenant/RentedUnit/RentedUnitMain'
import ViewUnitDetails from './pages/tenant/ViewUnitDetails/ViewUnitDetails'
import Homepage from './pages/tenant/Homepage/Homepage'
import UnitLocation from './pages/tenant/ViewUnitDetails/Location/UnitLocation'
import UnitComparison from './pages/tenant/UnitComparison/UnitComparison'
// import './App.css'

import AuthContext from './context/auth-context'
import useAuth from './hooks/data/auth-hook'
import Notifications from './pages/notifications/Notifications'
import UnitAfterSearch from './pages/tenant/UnitAfterSearch/UnitAfterSearch'
import SearchUnit from './pages/tenant/SearchUnit/SearchUnit'
import Favorites from './pages/tenant/Favorites/Favorites'
import CostComparison from './pages/tenant/CostComparison/CostComparison'
import Expenditures from './pages/tenant/CostComparison/Expenditures'
import CostComparisonTool from './pages/tenant/CostComparison/CostComparisonTool'
// import Homepage from './pages/tenant/Homepage/Homepage'
import { ComparisonToolContextProvider } from './context/comparison-tool-context'
import { LinearProgress } from '@mui/material'
import About from './pages/about/About'
import ChangeContactNumberMain from './pages/Profile/ChangeContactNumber/ChangeContactNumberMain'
import SplashScreen from './components/SplashScreen/SplashScreen'
import LocationEdit from './pages/landlord/ManageUnits/EditUnit/Location/LocationEdit'
import CompareUnit from './pages/tenant/CompareUnit/CompareUnit'
import CompareUnitTool from './pages/tenant/CompareUnit/CompareUnitTool'

function App() {
    const { user, token, loginHandler, logoutHandler, isLoggedIn } = useAuth()
    const navigate = useNavigate()

    const storedData = JSON.parse(localStorage.getItem('userData'))

    let routes

    if (isLoggedIn !== 'initial' && !isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/signin" element={<SignInPage />}></Route>
                <Route
                    path="/signin/forgotpassword"
                    element={<ForgotPasswordMain />}
                ></Route>
                <Route path="/register" element={<CreateAccount />}></Route>

                <Route path="/about" element={<About />}></Route>
                <Route
                    path="*"
                    element={<Navigate replace to="/about" />}
                ></Route>
            </Routes>
        )
    } else if (isLoggedIn !== 'initial' && isLoggedIn) {
        routes = (
            <Suspense fallback={<LinearProgress />}>
                <Routes>
                    {/* <Route path="/landlord-home" element={<Dashboard />}></Route>
                <Route path="/tenant-home" element={<Homepage />}></Route> */}
                    <Route
                        path="/"
                        element={
                            user && user.user_type_id == 2 ? (
                                <Dashboard />
                            ) : user && user.user_type_id == 3 ? (
                                <Homepage />
                            ) : (
                                <SplashScreen />
                            )
                        }
                    ></Route>

                    <Route path="/about" element={<About />}></Route>
                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    ></Route>
                    <Route path="/chats/" element={<Chats />}></Route>
                    <Route
                        path="/chats/:room_id"
                        element={<Conversation />}
                    ></Route>
                    <Route path="/calendar" element={<MyCalendar />}></Route>
                    <Route
                        path="/subscriptions"
                        element={<Subscriptions />}
                    ></Route>
                    <Route
                        path="/avail_subscriptions/:id"
                        element={<AvailSubscription />}
                    ></Route>
                    <Route
                        path="/manage_subscriptions"
                        element={<ManageSubscriptions />}
                    ></Route>
                    {/* Manage Landlord Unit */}
                    <Route path="/manage_unit" element={<ManageUnit />}></Route>
                    <Route
                        path="/manage_unit/create_unit"
                        element={<CreateUnit />}
                    ></Route>
                    <Route
                        path="/manage_unit/create_unit/location"
                        element={<Location />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/:id"
                        element={<UnitData />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/images/:id"
                        element={<UnitImageData />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/amenities/:id"
                        element={<UserAmenities />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/facilities/:id"
                        element={<UserFacilities />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/inclusions/:id"
                        element={<UserInclusions />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/rules/:id"
                        element={<UserRules />}
                    ></Route>
                    <Route
                        path="/manage_unit/edit/location/:id"
                        element={<LocationEdit />}
                    ></Route>
                    {/* Manage Landlord Unit */}
                    {/* Profile */}
                    <Route path="/profile" element={<Profile />}></Route>
                    {/* Landlord Profile */}
                    <Route
                        path="/profile/user_profile"
                        element={<EditProfile />}
                    ></Route>
                    <Route
                        path="/profile/user_profile/verify"
                        element={<AccountVerification />}
                    ></Route>
                    {/* Landlord Profile */}
                    {/* Profile */}
                    {/* Report test will remove later */}
                    <Route path="/report_test" element={<Report />}></Route>
                    {/* Report test will remove later */}

                    {/* View unit details for landlord */}
                    <Route
                        path="/unit/:id"
                        element={<ViewUnitDetails />}
                    ></Route>
                    <Route
                        path="/unit/unit_address/:id"
                        element={<UnitLocation />}
                    ></Route>
                    {/* View unit details for landlord */}

                    {/* Unit Search */}
                    <Route path="/search" element={<SearchUnit />}></Route>
                    {/* Unit Search */}

                    {/* Unit Comparison */}
                    {/* <Route
                        path="/unit_comparison/:id"
                        element={<UnitComparison />}
                    ></Route> */}
                    {/* Unit Comparison */}

                    <Route path="/myunit-landlord" element={<MyUnit />}></Route>
                    <Route
                        path="/myunit-landlord/managerenters"
                        element={<ManageRenters />}
                    ></Route>
                    <Route path="/rules" element={<Rules />}></Route>
                    <Route
                        path="/viewprofile/:id"
                        element={<ViewProfile />}
                    ></Route>
                    {/* <Route
                    path="*"
                    element={<Navigate replace to="/signin" />}
                ></Route> */}
                    <Route
                        path="/rentedunit"
                        element={<RentedUnitMain />}
                    ></Route>

                    <Route
                        path="/unitaftersearch"
                        element={<UnitAfterSearch />}
                    ></Route>
                    <Route path="/favorites" element={<Favorites />}></Route>

                    <Route
                        path="/change_contact_number"
                        element={<ChangeContactNumberMain />}
                    ></Route>

                    <Route
                        path="/costcomparison"
                        element={<CostComparisonTool />}
                    >
                        <Route path="" element={<CostComparison />} />
                        <Route path="edit" element={<Expenditures />} />
                    </Route>
                    <Route
                        path="/unitcomparison"
                        element={<CompareUnitTool />}
                    ></Route>

                    <Route path="/about" element={<About />}></Route>
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>404! Page not found.</h1>
                            </div>
                        }
                    ></Route>
                </Routes>
            </Suspense>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                token: token,
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {routes}
        </AuthContext.Provider>
    )
}

export default App
