import { useState, useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import UserToggleButton from './UserToggleButton'
import CreateAccountForm from './CreateAccountForm'
import { useGoogleLogin } from '@react-oauth/google'
import useAuth from '../../../hooks/data/auth-hook'
import useGoogleAuth from '../../../hooks/data/google-auth-hook'
import useFacebookAuth from '../../../hooks/data/facebook-auth'
import AuthContext from '../../../context/auth-context'
import useNotistack from '../../../hooks/notistack-hook'

import styles from './CreateAccount.module.css'

const CreateAccount = () => {
    const { accountRegistration, isLoading } = useAuth()
    const { googleAccountRegistration, googleAuth } = useGoogleAuth()
    const { facebookAccountRegistration } = useFacebookAuth()
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()
    const { notify } = useNotistack()
    const receivedData = useLocation()

    const [counter, setCounter] = useState(0)
    const [userType, setUserType] = useState({
        user_type_id:
            receivedData.state && receivedData.state.user_type_id
                ? receivedData.state.user_type_id
                : 2,
    })

    const userTypeHandler = useCallback(
        (userType) => {
            setUserType(userType)
        },
        [setUserType]
    )

    const createAccountHandler = async (userData) => {
        const data = {
            ...userData,
            user_type_id: userType.user_type_id,
        }

        try {
            const res = await accountRegistration(data)

            ctx.onLogin({ user: res.user, token: res.token })
            // navigate('/')
        } catch (error) {
            notify('Email already exist.', 'info')
        }
    }

    const googleRegisterHandle = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                const res = await googleAuth(credentialResponse)

                const data = {
                    first_name: res.given_name,
                    last_name: res.family_name,
                    email: res.email,
                    profile_picture_img: res.picture,
                    user_type_id: userType.user_type_id,
                }

                const registerGoogleRes = await googleAccountRegistration(data)
                ctx.onLogin({
                    user: registerGoogleRes.user,
                    token: registerGoogleRes.token,
                })
                navigate('/')
            } catch (error) {
                notify('Email already exist.', 'info')
            } {}
        },
    })

    // const nameTransFunction = (nameParts) => {
    //     let first_name = nameParts.filter((element) => !element.includes('.'))
    //     first_name.pop()
    //     first_name = first_name.join(' ')

    //     let middle_name = nameParts.filter((element) => element.includes('.'))

    //     let last_name = nameParts[nameParts.length - 1]

    //     return {
    //         first_name: first_name,
    //         middle_name: middle_name.join(' '),
    //         last_name: last_name,
    //     }
    // }

    // const facebookRegisterHandler = async (response) => {
    //     console.log(response);
    //     const user_name = response.name.split(' ')

    //     const transform_name = nameTransFunction(user_name)

    //     const data = {
    //         first_name: transform_name.first_name,
    //         middle_name: !transform_name.middle_name
    //             ? ''
    //             : transform_name.middle_name,
    //         last_name: transform_name.last_name,
    //         email: response.email,
    //         profile_picture_img: response.picture.data.url,
    //         user_type_id: userType.user_type_id,
    //     }

    //     console.log(data);

        // try {
        //     const res = await facebookAccountRegistration(data)
        //     console.log(res);
        //     ctx.onLogin({ user: res.user, token: res.token })
        //     navigate('/');
        // } catch (error) {}
    // }

    window.fbAsyncInit = function () {
        // FB JavaScript SDK configuration and setup
        FB.init({
            appId: "863373298592556", // FB App ID
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true, // parse social plugins on this page
            version: "v3.2", // use graph api version 2.8
        });

        // Check whether the user already logged in
        FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
                //display user data
                getFbUserData();
            }
        });
    };

    // Load the JavaScript SDK asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Facebook login with JavaScript SDK
    function facebookRegisterHandler() {
        FB.login(
            function (response) {
                if (response.authResponse) {
                    // Get and display the user profile data
                    getFbUserData();
                    // document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
                }
            },
            { scope: "email" }
        );
    }

    const SubmitFaceBookData = async (data) => {
        try {
                const res = await facebookAccountRegistration(data)
                console.log(res);
                ctx.onLogin({ user: res.user, token: res.token })
                navigate('/');
            } catch (error) {
                notify('Email already exist.', 'info')
            }
    }

    const getFbUserData = () => {
        window.FB.api(
            "/me",
            { fields: "id,first_name,last_name,email,picture.width(200)" },
            function (response) {
                console.log(response);

                const data = {
                    email: response.email,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    profile_picture_img: response.picture.data.url,
                    user_type_id: userType.user_type_id,
                }

                SubmitFaceBookData(data);

                // try {
                //     const res = await facebookAccountRegistration(data)
                //     console.log(res);
                //     ctx.onLogin({ user: res.user, token: res.token })
                //     navigate('/');
                // } catch (error) {}
            }
        );
    };

    return (
        <div className={styles.container}>
            <div className={`${styles['container-title']}`}>
                <h2>Create Account</h2>
            </div>
            <div className={`${styles['main-container']}`}>
                <div className={`${styles['main-container-type']}`}>
                    <UserToggleButton
                        onUserType={userTypeHandler}
                        initialSelected={userType}
                    />
                </div>

                <div className={`${styles['main-container-form']}`}>
                    <CreateAccountForm
                        onCreateAccount={createAccountHandler}
                        isLoading={isLoading}
                        onGoogleAuth={googleRegisterHandle}
                        onfacebookAuth={facebookRegisterHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateAccount
