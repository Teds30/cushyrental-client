import { useEffect, useContext, useState } from "react";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

import AuthContext from "../../../context/auth-context";
import useBookmark from "../../../hooks/data/bookmark-hook";

export default function LandlordProfileBookmark(props) {
    const { adjustSize = "false", unitId } = props;

    const { fetchBookmark, addToBookmark, isLoading } = useBookmark();
    const userCtx = useContext(AuthContext);

    const [isBookmark, setIsBookmark] = useState();

    const bookmarkHandler = async (event) => {
        event.preventDefault();

        try {
            const data = { user_id: userCtx.user.id, unit_id: unitId };
            console.log(data);
            const res = await addToBookmark(data);
            console.log(res);
            setIsBookmark(res.unit_id === unitId ? true : false);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchBookmark(userCtx.user.id);
                const isUnitBookmarked = res.filter(
                    (bookmark) => bookmark.unit_id === unitId
                );
                setIsBookmark(isUnitBookmarked.length !== 0 ? true : false);
            } catch (err) {}
        };
        if (isBookmark === undefined) {
            handleFetch();
        }
    }, [userCtx]);

    return (
        isBookmark !== undefined && (
            <div>
                <Checkbox
                    checked={isBookmark}
                    icon={
                        <BsBookmark
                            style={{
                                width: "18px",
                                height: "18px",
                                color: "var(--fc-strong)",
                                fill: "var(--fc-body)",
                            }}
                        />
                    }
                    checkedIcon={
                        <BsBookmarkFill
                            style={{
                                width: "18px",
                                height: "18px",
                                color: "var(--fc-strong)",
                                fill: "var(--accent)",
                            }}
                        />
                    }
                    onClick={bookmarkHandler}
                />
            </div>
        )
    );
}
