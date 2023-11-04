import React, { useEffect, useState } from "react";

const TextMarque = (props) => {
    const { name } = props;
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseOver = () => {
        setIsPaused(true);
    };

    const handleMouseOut = () => {
        setIsPaused(false);
    };

    return (
        <marquee
            className="caption"
            style={{ color: "white", width: '100%' }}
            behavior="scroll"
            scrollamount={'3'}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {name}
        </marquee>
    );
};

export default TextMarque;
