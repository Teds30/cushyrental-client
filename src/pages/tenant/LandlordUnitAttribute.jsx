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
                        />
                    }
                    label={amenity.amenity.name}
                    variant="outlined"
                />
            </Stack>
        </div>
    );
};

export default LandlordUnitAttribute;
