import { useCallback, useContext, useState } from "react";
import useHttp from "../http-hook";

const useUnitManager = () => {
  const { sendRequest, isLoading } = useHttp();

  const fetchUnits = useCallback(async () => {
    let responseData;
    try {
      responseData = await sendRequest({
        url: `http://127.0.0.1:8000/api/units`,
      });
    } catch (err) {
      throw err.message;
    }

    return responseData;
  }, [sendRequest]);

  const fetchUnit = useCallback(
    async (id) => {
      let responseData;
      try {
        responseData = await sendRequest({
          url: `http://127.0.0.1:8000/api/units/${id}`,
        });
      } catch (err) {
        throw err.message;
      }

      return responseData;
    },
    [sendRequest]
  );

  const updateUnit = useCallback(
    async (id, body) => {
      let responseData;
      try {
        responseData = await sendRequest({
          url: `http://127.0.0.1:8000/api/units/${id}`,
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        throw err.message;
      }

      return responseData;
    },
    [sendRequest]
  );

  return {
    isLoading,
    fetchUnits,
    fetchUnit,
  };
};

export default useUnitManager;
