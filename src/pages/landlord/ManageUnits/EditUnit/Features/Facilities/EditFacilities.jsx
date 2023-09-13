import { useState, useEffect } from "react";
import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";

import styles from "./EditFacilities.module.css";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";
import FacilityCR from "./FacilityCR";
import FacilityKS from "./FacilityKS";
import FacilityOthers from "./FacilityOthers";

const EditAmenities = (props) => {
    const { unitFacilities } = props;
    const { fetchFacilities, isLoading } = useAttributeManager();

    const [facilities, setFacilities] = useState([]);
    const [comfortRoom, setComfortRoom] = useState(
        facilities.filter((facility) => facility.name === "Comfort Room")
    );
    const [kitchenSink, setKitchenSink] = useState(
        facilities.filter((facility) => facility.name === "Kitchen Sink")
    );
    const [ otherFacilities, setOtherFacilities ] = useState([]);

    const cRFacilityHandler = (value) => {
        let found = false;
        const updatedComfortRoom = kitchenSink.map((facility) => {
            if (facility.id === value.id) {
                found = true;
                // Update the specific item with the matching id
                return { ...facility, is_shared: value.is_shared };
            }
            return facility;
        });

        if (!found) {
            setComfortRoom([value]);
        } else {
            setComfortRoom(updatedComfortRoom);
        }
    };

    const kSFacilityHandler = (value) => {
        let found = false;
        const updatedComfortRoom = comfortRoom.map((facility) => {
            if (facility.id === value.id) {
                found = true;
                // Update the specific item with the matching id
                return { ...facility, is_shared: value.is_shared };
            }
            return facility;
        });

        if (!found) {
            setKitchenSink([value]);
        } else {
            setKitchenSink(updatedComfortRoom);
        }
    };

    const otherFacilityHandler = (value) => {
        setOtherFacilities(value);
    }

    const saveAmenityHandler = (event) => {
        event.preventDefault();

        // save to database here
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchFacilities();
                setFacilities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return !isLoading && facilities.length !== 0 ? (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["main-feature-title"]}`}>
                    <p className="title">Set up facilities</p>
                </div>

                <div className={`${styles['feature-main-body']}`}>
                    <div className={`${styles["main-attributes"]}`}>
                    <FacilityCR
                        facilityCR={facilities.filter(
                            (facility) => facility.name === "Comfort Room"
                        )}
                        onCRFacility={cRFacilityHandler}
                        comfortRoom={comfortRoom}
                    />
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["main-attributes"]}`}>
                    <FacilityKS
                        facilityKS={facilities.filter(
                            (facility) => facility.name === "Kitchen Sink"
                        )}
                        onKSFacility={kSFacilityHandler}
                        kitchenSink={kitchenSink}
                    />
                </div>

                    <div className={styles["hr"]}></div>

                    <div className={`${styles["main-attributes"]}`}>
                        <FacilityOthers
                            facilityOthers={facilities.filter(
                                (facility) =>
                                    facility.name !== "Kitchen Sink" &&
                                    facility.name !== "Comfort Room"
                            )}
                            onOtherFacilities={otherFacilityHandler}
                            // others={kitchenSink}
                        />
                    </div>
                </div>
            </div>

            <div className={`${styles["feature-button"]}`}>
                <PrimaryButton width="100%">Save</PrimaryButton>
            </div>
        </form>
    ) : (
        ""
    );
};

export default EditAmenities;
