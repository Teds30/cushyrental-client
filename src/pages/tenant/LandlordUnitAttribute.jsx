import React, {useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useImageManager from "../../hooks/data/image-hook";

const LandlordUnitAttribute = (props) => {
    const { amenity } = props;
    const [icon, setIcon] = useState(null);
    const { fetchIcon } = useImageManager();

    useEffect(() => {
        fetchData(amenity.amenity.icon)
        console.log(amenity)
    }, [])

    const fetchData = async (name) => {
        const res = await fetchIcon(name)
        setIcon(res)
    }

    return (
        <div>
            {" "}
            <Stack direction="row" spacing={1}>
                <Chip
                    icon={
                        <div
                            dangerouslySetInnerHTML={{
                                __html: icon,
                            }}
                            style={{
                                backgroundColor: "#D9D9D9",  // Circle fill color
                                borderRadius: "50%",       // Creates a circle
                                width: "24px",             // Adjust width to control circle size
                                height: "24px",            // Adjust height to control circle size
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#5C6173",          // Icon color
                            }}
                            
                        />
                    }
                    label={amenity.amenity.name}
                    style={{ color: "#8A93A6" }}
                    variant="outlined"
                    sx={{ padding: "3px", border: "2px solid #E4E9ED"}}
                />
            </Stack>
        </div>
    );
};

export default LandlordUnitAttribute;
