import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateAccount from './pages/auth/CreateAccount/CreateAccount'
import SignInPage from './pages/Login/SignInPage'
import ForgotPassword from './pages/Login/ForgotPassword'
import Conversation from './pages/chat/Conversation'
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
import ViewProfile from './pages/tenant/ViewProfile'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'
// import Subscriptions from './pages/landlord/Subscriptions/Subscriptions'
import ManageSubscriptions from './pages/landlord/ManageSubscriptions/ManageSubscriptions'
import AccountVerification from './pages/landlord/LandProfile/AccountVerification'
// import './App.css'

function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <>
                        <h1>Login</h1>
                    </>
                }
            ></Route>

            <Route path="/landlord-home" element={<Dashboard />}></Route>

            <Route path="/chats/" element={<Chats />}></Route>
            <Route path="/chats/:room_id" element={<Conversation />}></Route>
            <Route path="/calendar" element={<MyCalendar />}></Route>

            <Route path="/signinpage" element={<SignInPage />}></Route>
            <Route
                path="/signinpage/forgotpassword"
                element={<ForgotPassword />}
            ></Route>

            <Route path="/register" element={<CreateAccount />}></Route>

            {/* Manage Landlord Subscriptions */}
            {/* <Route path="/subscriptions" element={<Subscriptions />}></Route> */}

            {/* Manage Landlord Subscriptions */}
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
            <Route path="/manage_unit/edit/:id" element={<UnitData />}></Route>
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
            {/* Manage Landlord Unit */}

            {/* Profile */}
            <Route path="/profile" element={<Profile />}></Route>

            {/* Landlord Profile */}
            <Route path="/profile/user_profile/:id" element={<EditProfile />}></Route>

            <Route
                path="/profile/user_profile/verify/:id"
                element={<AccountVerification />}
            ></Route>
            {/* Landlord Profile */}
            {/* Profile */}

            {/* Report test will remove later */}
            <Route path="/report_test" element={<Report />}></Route>
            {/* Report test will remove later */}

            <Route path="/myunit-landlord" element={<MyUnit />}></Route>

            <Route
                path="/myunit-landlord/managerenters"
                element={<ManageRenters />}
            ></Route>

            <Route path="/rules" element={<Rules />}></Route>

            <Route path="/viewprofile" element={<ViewProfile />}></Route>
            <Route
                path="*"
                element={<Navigate replace to="/signinpage" />}
            ></Route>
        </Routes>
    )
}

export default App
