import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Bookmark(props) {
    const { adjustSize = "false" } = props;

    const [ isBookmark, setIsBookmark ] = React.useState(false);

    const bookmarkHandler = () => {
        setIsBookmark(prevIsBookmark => !prevIsBookmark);
    }

    return (
        <div>
            <Checkbox
                // {...label}
                // {}
                icon={<BookmarkBorderIcon sx={{fill: 'green'}} />}
                checkedIcon={<BookmarkIcon sx={{fill: 'green'}} />}
                onClick={bookmarkHandler}
            />
        </div>
    );
}
