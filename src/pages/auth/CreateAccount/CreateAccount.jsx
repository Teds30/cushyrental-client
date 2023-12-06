import { useState, useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UserToggleButton from "./UserToggleButton";
import CreateAccountForm from "./CreateAccountForm";
import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "../../../hooks/data/auth-hook";
import useGoogleAuth from "../../../hooks/data/google-auth-hook";
import useFacebookAuth from "../../../hooks/data/facebook-auth";
import AuthContext from "../../../context/auth-context";
import useNotistack from "../../../hooks/notistack-hook";

import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
    const { accountRegistration, isLoading } = useAuth();
    const { googleAccountRegistration, googleAuth } = useGoogleAuth();
    const { facebookAccountRegistration } = useFacebookAuth();
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const { notify } = useNotistack();
    const receivedData = useLocation();

    const [counter, setCounter] = useState(0);
    const [userType, setUserType] = useState({
        user_type_id:
            receivedData.state && receivedData.state.user_type_id
                ? receivedData.state.user_type_id
                : 2,
    });

    const userTypeHandler = useCallback(
        (userType) => {
            setUserType(userType);
        },
        [setUserType]
    );

    const createAccountHandler = async (userData) => {
        const data = {
            ...userData,
            user_type_id: userType.user_type_id,
        };

        try {
            const res = await accountRegistration(data);

            ctx.onLogin({ user: res.user, token: res.token });
            // navigate('/')
        } catch (error) {
            notify("Email already exist.", "info");
        }
    };

    const googleRegisterHandle = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                const res = await googleAuth(credentialResponse);

                const data = {
                    first_name: res.given_name,
                    last_name: res.family_name,
                    email: res.email,
                    profile_picture_img: res.picture,
                    user_type_id: userType.user_type_id,
                };

                const registerGoogleRes = await googleAccountRegistration(data);
                ctx.onLogin({
                    user: registerGoogleRes.user,
                    token: registerGoogleRes.token,
                });
                navigate("/");
            } catch (error) {
                notify("Email already exist.", "info");
            }
            {
            }
        },
    });

    const facebookRegisterHandler = async () => {
        try {
            // Assuming the Facebook SDK is already loaded
            const response = await new Promise((resolve) =>
                window.FB.login(resolve, { scope: "email" })
            );

            if (response.authResponse) {
                getFbUserData();
            }
        } catch (error) {
            console.error("Error during Facebook login:", error);
        }
    };

    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "782460463883150", // Replace with your FB App ID
                cookie: true,
                xfbml: true,
                version: "v12.0", // Use the latest version
            });

            window.FB.getLoginStatus(function (response) {
                if (response.status === "connected") {
                    getFbUserData();
                }
            });
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };

    useEffect(() => {
        loadFacebookSDK();
    }, []);

    const getFbUserData = () => {
        window.FB.api(
            "/me",
            { fields: "id,first_name,last_name,email,picture.width(200)" },
            async function (response) {
                console.log(response);

                const data = {
                    email: response.email,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    middle_name: 'middle_name',
                    profile_picture_img: response.picture.data.url,
                    user_type_id: userType.user_type_id,
                };

                try {
                    const res = await facebookAccountRegistration(data);
                    console.log(res);
                    ctx.onLogin({ user: res.user, token: res.token });
                    navigate("/");
                } catch (error) {
                    notify("Email already exist.", "info");
                }
            }
        );
    };

    return (
        <div className={styles.container}>
            <div className={`${styles["container-title"]}`}>
                <h2>Create Account</h2>
            </div>
            <div className={`${styles["main-container"]}`}>
                <div className={`${styles["main-container-type"]}`}>
                    <UserToggleButton
                        onUserType={userTypeHandler}
                        initialSelected={userType}
                    />
                </div>

                <div className={`${styles["main-container-form"]}`}>
                    <CreateAccountForm
                        onCreateAccount={createAccountHandler}
                        isLoading={isLoading}
                        onGoogleAuth={googleRegisterHandle}
                        onfacebookAuth={facebookRegisterHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
