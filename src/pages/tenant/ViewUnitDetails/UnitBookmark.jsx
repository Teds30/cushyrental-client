import React, { useState, useEffect, useContext } from "react";

import useBookmark from "../../../hooks/data/bookmark-hook";
import AuthContext from "../../../context/auth-context";

import styles from "./ViewUnitDetails.module.css";
import IconButton from '@mui/material/IconButton';
import {
    BsBookmark,
    BsBookmarkFill,
} from 'react-icons/bs'

const UnitBookmark = (props) => {
    const { scrolling, unitId } = props;

    const { fetchBookmark, addToBookmark, isLoading } = useBookmark();
    const userCtx = useContext(AuthContext);

    const [isBookmarked, setIsBookmarked] = useState();

    console.log(isBookmarked)

    const handleBookmarkClick = async () => {
        const data = {'user_id': userCtx.user.id, unit_id: unitId};
        const res = await addToBookmark(data);

        setIsBookmarked(res.unit_id === unitId ? true : false);
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                console.log('Pumasok dito?????')
                const res = await fetchBookmark(userCtx.user.id);
                const isUnitBookmarked = res.filter(bookmark => bookmark.unit_id === unitId);
                setIsBookmarked(isUnitBookmarked.length !== 0 ? true : false);
            } catch (err) {}
        }
        
        if (isBookmarked === undefined) {
            handleFetch()
        }

    }, [userCtx]);
    
    return (
        <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleBookmarkClick}
        >
            {isBookmarked === true ? (
                <BsBookmarkFill
                    style={{
                        fill: "var(--accent)",
                        background: "transparent",
                    }}
                />
            ) : (
                <BsBookmark
                    style={{
                        fill: scrolling ? "var(--fc-strong)" : "#fff",
                    }}
                />
            )}
        </IconButton>
    );
};

export default UnitBookmark;
