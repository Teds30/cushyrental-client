import useNotistack from "../../hooks/notistack-hook";

export const useSendEmail = () => {
    const { notify } = useNotistack();

    const config = {
        Username: "CushyRental@gmail.com",
        Password: "0E27E2B1214676DD3BB97DD3BD042C20DD35",
        Host: "smtp.elasticemail.com",
        Port: 2525,
        From: "CushyRental@gmail.com",
        Subject: "HUWAG I SHARE ANG IYONG OTP",
    };

    const sendOtp = (email, otp, message) => {
        const updateConfig = {
            ...config,
            To: email,
            Body: message + otp.join(""),
        };

        if (window.Email) {
            window.Email.send(updateConfig).then((response) => {
                if (response === "OK") {
                    // alert('Email successfully sent!');
                    notify("Email successfully sent!", "success");
                } else {
                    // alert('Email sending failed. Please check your credentials and try again.');
                    notify(
                        "Email sending failed. Please check your credentials and try again.",
                        "error"
                    );
                }
            });
        }
    };

    return {
        sendOtp,
    };
};

export default useSendEmail;
