import { useCallback, useContext, useState } from "react";
import useHttp from "../http-hook";

const useGoogleAuth = () => {
  const { sendRequest, isLoading } = useHttp();

  const googleAuth = useCallback(
    async (data) => {
      let responseData;
      try {
        responseData = await sendRequest({
          url: "https://www.googleapis.com/oauth2/v3/userinfo",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        return responseData;
      } catch (err) {
        throw err.message;
      }
    },
    [sendRequest]
  );

  const googleAccountRegistration = useCallback(
    async (body) => {
      let responseData;
      try {
        responseData = await sendRequest({
          url: "http://127.0.0.1:8000/api/google/auth",
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return responseData;
      } catch (err) {
        throw err.message;
      }
    },
    [sendRequest]
  );

  return {
    isLoading,
    googleAuth,
    googleAccountRegistration,
  };
};

export default useGoogleAuth;
