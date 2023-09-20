import { useState, useEffect } from "react";
import useImageManager from "../../../../../../hooks/data/image-hook";
import Dropdown from "../../../../../../components/Dropdown/Dropdown";

import styles from "./EditFacilities.module.css";

const FacilityKS = (props) => {
    const { facilityKS, onKSFacility, kitchenSink } = props;
    const { fetchIcon, isLoading } = useImageManager();
    const [kSFacility, setKSFacility] = useState(facilityKS);
    const [icon, setIcon] = useState("");

    const handleCRSelect = (event) => {
        if (event.target.value === "Choose") {
            return;
        }

        onKSFacility({
            id: kSFacility[0].id,
            is_shared: event.target.value === "Owned" ? 0 : 1,
        });
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchIcon(kSFacility[0].icon);
                setIcon(res);
            } catch (err) {
                // Handle errors here
            }
        };
        handleFetch();
    }, [kSFacility, fetchIcon]);

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

                    <p>{kSFacility[0].name}</p>
                </div>
                <Dropdown
                    label=""
                    selected={
                        kitchenSink.length !== 0
                            ? kitchenSink[0].is_shared === 0
                                ? "Owned"
                                : kitchenSink[0].is_shared === 1
                                && "Shared"
                            : "Choose"
                    }
                    items={[
                        { id: -1, name: "Choose" },
                        { id: 0, name: "Owned" },
                        { id: 1, name: "Shared" },
                    ]}
                    handleSelect={handleCRSelect}
                />
            </div>

            <div className={styles["hr"]}></div>
        </div>
    );
};

export default FacilityKS;
