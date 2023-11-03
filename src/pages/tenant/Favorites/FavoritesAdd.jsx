import React, { useEffect, useState } from "react";
import useBookmark from "../../../hooks/data/bookmark-hook";

const FavoritesAdd = () => {
    const { fetchBookmark, isLoading } = useBookmark();
    const [bookmark, setBookmark] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchBookmark();
                setBookmark(res);
            } catch (err) {}
        }
        handleFetch();
    }, []);
    
  return (

    <div>FavoritesAdd</div>
  )
}

export default FavoritesAdd