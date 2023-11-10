import React, { useState, useEffect, useContext} from "react";
import { Link, navigate } from "react-router-dom";
import styles from "./RentedUnit.module.css";

import moment from "moment";
import RentedUnitTabs from "./RentedUnitTabs";
import AuthContext from "../../../context/auth-context";

const RentedUnitMain = () => {
    
    const [rentedUnit, setRentedUnit] = useState([]);
    const authCtx = useContext(AuthContext);

    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format("MMMM DD, YYYY");
    };


    const fetchRentals = async () => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_LOCALHOST
                }/api/tenant-rentals/${authCtx.user.id}`
            );
            const data = await response.json();
            setRentedUnit(data);
            console.log("fetched");
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    console.log(rentedUnit);
    // console.log(authCtx.user.id);
    useEffect(() => {
        
        if (authCtx.user)
        fetchRentals();
    }, [authCtx.user]);

    return (
        <div className={`${styles["main-container"]} `} >
            {/* {rentedUnit.length !== 0 && ( */}
                  <div >
                  <RentedUnitTabs rentedUnit={rentedUnit} onRefresh={fetchRentals}/>
              </div>
            {/* )} */}
          
        </div>
    );
};

export default RentedUnitMain;
