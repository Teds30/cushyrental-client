import { useEffect, useState } from "react";

import useImageManager from "../../../hooks/data/image-hook";

import photo from "../../../assets/cushyrental.svg";

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
    return;
};

export default ManageRenterImage;
