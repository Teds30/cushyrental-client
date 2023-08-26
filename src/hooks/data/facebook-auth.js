import { useCallback, useContext, useState } from "react";
import useHttp from "../http-hook";

const useFacebookAuth = () => {
  const { sendRequest, isLoading } = useHttp();

  const facebookAccountRegistration = useCallback(
    async (body) => {
      let responseData;
      try {
        responseData = await sendRequest({
          url: "http://127.0.0.1:8000/api/facebook/auth",
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
    facebookAccountRegistration
  };
};

export default useFacebookAuth;
