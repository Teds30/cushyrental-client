import { useState, useEffect } from "react";
import useImageManager from "../../../../../../hooks/data/image-hook";
import Dropdown from "../../../../../../components/Dropdown/Dropdown";

import styles from "./EditFacilities.module.css";

const FacilityCR = (props) => {
    const { facilityCR, onCRFacility, comfortRoom } = props;

    const { fetchIcon, isLoading } = useImageManager();
    const [cRFacility, setCRFacility] = useState(facilityCR);
    const [icon, setIcon] = useState("");

    const handleCRSelect = (event) => {
        if (event.target.value === "Choose") {
            return;
        }

        onCRFacility({
            id: cRFacility[0].id,
            is_shared: event.target.value === "Owned" ? 1 : 2,
        });
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchIcon(cRFacility[0].icon);
                setIcon(res);
            } catch (err) {
                // Handle errors here
            }
        };
        handleFetch();
    }, [cRFacility, fetchIcon]);

    return isLoading && icon === "" ? (
        "adsfdsf"
    ) : (
        <div className={`${styles["facility-container"]}`}>
            <div className={`${styles["facility-row"]}`}>
                <div className={`${styles["facility-col"]}`}>
                    <div className={`${styles["facility-icon"]}`}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: icon,
                            }}
                        />
                    </div>

                    <p>{cRFacility[0].name}</p>
                </div>
                <Dropdown
                    label=""
                    selected={
                        comfortRoom.length !== 0
                            ? comfortRoom[0].is_shared === 1
                                ? "Owned"
                                : comfortRoom[0].is_shared === 2
                                ? "Shared"
                                : "Choose"
                            : "Choose"
                    }
                    items={[
                        { id: 0, name: "Choose" },
                        { id: 1, name: "Owned" },
                        { id: 2, name: "Shared" },
                    ]}
                    handleSelect={handleCRSelect}
                />
            </div>

            <div className={styles["hr"]}></div>
        </div>
    );
};

export default FacilityCR;
