import React, { useContext } from "react"; // Import React and useContext
import { Link } from "react-router-dom";
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Google from "../../assets/google.svg";
import styles from "../Login/SignInPage.module.css";
import useGoogleAuth from "../../hooks/data/google-auth-hook";
import useFacebookAuth from "../../hooks/data/facebook-auth";
import AuthContext from "../../context/auth-context";


const SocialMediaLogin = () => {
    const { googleAccountLogin, googleAuth } = useGoogleAuth();
    const { facebookAccountRegistration } = useFacebookAuth();
    const ctx = useContext(AuthContext);

    const onGoogleAuth = async (credentialResponse) => {
        try {
          const res = await googleAuth(credentialResponse);
    
          const data = {
            email: res.email,
          };
    
          const registerGoogleRes = await googleAccountLogin(data);
          ctx.onLogin(registerGoogleRes.user, registerGoogleRes.token);
          console.log(registerGoogleRes.user);
        } catch (error) {
          console.log(error);
        }
      };
    
      const nameTransFunction = (nameParts) => {
        let first_name = nameParts.filter((element) => !element.includes("."));
        first_name.pop();
        first_name = first_name.join(" ");
    
        let middle_name = nameParts.filter((element) => element.includes("."));
    
        let last_name = nameParts[nameParts.length - 1];
    
        return {
          first_name: first_name,
          middle_name: middle_name.join(" "),
          last_name: last_name,
        };
      };
    
      const facebookRegisterHandler = async (response) => {
        const user_name = response.name.split(" ");
    
        const transform_name = nameTransFunction(user_name);
    
        const data = {
          first_name: transform_name.first_name,
          middle_name: !transform_name.middle_name
            ? ""
            : transform_name.middle_name,
          last_name: transform_name.last_name,
          email: response.email,
          profile_picture_img: response.picture.data.url,
          user_type_id: userType.user_type_id,
        };
    
        try {
          const res = await facebookAccountRegistration(data);
          ctx.onLogin(res.user, res.token);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      };

      const responseFacebook = (response) => {
        facebookRegisterHandler(response);
      };

      const googleRegisterHandle = useGoogleLogin({
        onSuccess: onGoogleAuth,
        onFailure: (error) => {
          console.log("Google authentication failed:", error);
        },
      });

      return (
        <div className={styles.socmed}>
          <FacebookLogin
            appId={"782460463883150"}
            fields="name,email,picture"
            callback={responseFacebook}
            render={({ disabled, onClick }) => (
              <Link
                onClick={onClick}
                disabled={disabled}
                className="facebook-login-button"
              >
                <div className={styles["background"]}>
                  <FacebookOutlinedIcon size="large" style={{ color: "#4267B2" }} />{" "}
                  Facebook
                </div>
              </Link>
            )}
          />
    
          <Link onClick={googleRegisterHandle}>
            <div className={styles["background"]}>
              <img src={Google} alt="Google Icon" className={styles.googleIcon} />{" "}
              Google
            </div>
          </Link>
        </div>
      );
};

export default SocialMediaLogin;
