import { useEffect, useState } from "react";
import useImageManager from "../../../hooks/data/image-hook";

const ManageRenterImage = (props) => {
    const { image } = props;
    const { fetchAvatar } = useImageManager();

    const [profile, setProfile] = useState("");

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAvatar(image);
                setProfile(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return profile !== "" && <img src={profile} alt="Renter" />;
};

export default ManageRenterImage;
