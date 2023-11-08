import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAttributeManager from "../../../../../../hooks/data/attribute-hook";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";
import FacilityCR from "./FacilityCR";
import FacilityKS from "./FacilityKS";
import FacilityOthers from "./FacilityOthers";
import useUserManager from "../../../../../../hooks/data/users-hook";
import useNotistack from "../../../../../../hooks/notistack-hook";
import useUnitManager from "../../../../../../hooks/data/units-hook";

import styles from "./EditFacilities.module.css";

const EditAmenities = (props) => {
    const { unitFacilities, unitId } = props;
    const { fetchFacilities } = useAttributeManager();
    const { updateUserFacilities } = useUserManager();
    const { notify } = useNotistack();
    const navigate = useNavigate();
    const { editUnitfacility, isLoading } = useUnitManager();

    const [facilities, setFacilities] = useState([]);

    console.log(unitFacilities)

    const [comfortRoom, setComfortRoom] = useState(
        unitFacilities.filter((facility) => {
            return facility.name === "Comfort Room";
        })
    );
    const [kitchenSink, setKitchenSink] = useState(
        unitFacilities.filter((facility) => {
            return facility.name === "Kitchen Sink";
        })
    );
    const [otherFacilities, setOtherFacilities] = useState(
        unitFacilities.filter((facility) => {
            if (
                facility.name !== "Kitchen Sink" &&
                facility.name !== "Comfort Room"
            ) {
                return facility;
            }
        })
    );

    const cRFacilityHandler = (value) => {
        let found = false;
        const updatedComfortRoom = comfortRoom.map((facility) => {
            if (facility.id === value.id) {
                found = true;
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
        const updatedComfortRoom = kitchenSink.map((facility) => {
            if (facility.id === value.id) {
                found = true;
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
    };

    const saveFacilityHandler = async (event) => {
        event.preventDefault();

        let data = [];
        let isFinished = true;

        if (comfortRoom.length !== 0) {
            const temp = comfortRoom.map((facility) => {
                return {
                    unit_id: Number(unitId),
                    facility_id: comfortRoom[0].id,
                    is_shared: comfortRoom[0].is_shared,
                };
            });

            data.push(...temp);
        }

        if (kitchenSink.length !== 0) {
            const temp = kitchenSink.map((facility) => {
                return {
                    unit_id: Number(unitId),
                    facility_id: kitchenSink[0].id,
                    is_shared: kitchenSink[0].is_shared,
                };
            });

            data.push(...temp);
        }

        data = data.concat(
            otherFacilities.map((facility) => ({
                unit_id: Number(unitId),
                facility_id: facility,
            }))
        );

        if (data.length === 0) {
            return;
        }

        const res = await editUnitfacility(data);
        console.log(res);

        navigate("/manage_unit/edit/" + unitId);
        notify("Facility save successfully", "success");
        // data.forEach(async (element, index) => {
        //     try {
        //         const res = await updateUserFacilities(element);
        //     } catch (error) {}

        //     if (index === data.length - 1) {
        //         navigate("/manage_unit/edit/" + unitId);
        //         notify("Facility save successfully", "success");
        //     }
        // });
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

    return facilities.length !== 0 ? (
        <form onSubmit={saveFacilityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["main-feature-title"]}`}>
                    <p className="title">Set up facilities</p>
                </div>

                <div className={`${styles["feature-main-body"]}`}>
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
                            others={otherFacilities}
                        />
                    </div>
                </div>
            </div>

            <div className={`${styles["feature-button"]}`}>
                <PrimaryButton
                    width="100%"
                    isLoading={isLoading}
                    loadingText="Saving"
                >
                    Save
                </PrimaryButton>
            </div>
        </form>
    ) : (
        ""
    );
};

export default EditAmenities;
