import useNotistack from "../../hooks/notistack-hook";

export const useSendEmail = () => {
    const { notify } = useNotistack();

    const config = {
      Username: 'johncanila.otilla@bicol-u.edu.ph',
      Password: '5AC808A0D271CCC1122A620B7BA2985BECE0',
      Host: 'smtp.elasticemail.com',
      Port: 2525,
      From: 'johncanila.otilla@bicol-u.edu.ph', 
      Subject: 'Reset Password in CushyRental',
    };
  
    const sendOtp = (email, otp) => {
      const updateConfig = {
        ...config,
        To: email,
        Body: 'Here are your two OTPs to reset your password: ' + otp.join(''),
      };

      console.log(updateConfig);
  
      if (window.Email) {
        window.Email.send(updateConfig).then((response) => {
          if (response === 'OK') {
            // alert('Email successfully sent!');
            notify('Email successfully sent!', 'success')
          } else {
            // alert('Email sending failed. Please check your credentials and try again.');
            notify('Email sending failed. Please check your credentials and try again.', 'error')
          }
        });
      }
    };
  
    return {
      sendOtp
    };
  };
  
  export default useSendEmail;
  