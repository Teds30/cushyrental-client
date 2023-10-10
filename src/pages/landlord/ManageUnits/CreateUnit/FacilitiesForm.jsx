import { useState, useEffect, useContext, Fragment } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";
import ComfortRoom from "./FacilityComponent/ComfortRoom";
import Others from "./FacilityComponent/Others";
import useUnitManager from "../../../../hooks/data/units-hook";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";
import KitchenSink from "./FacilityComponent/KitchenSink";

const FacilitiesForm = (props) => {
    const { onBack, onNext } = props;
    const { createUnit } = useUnitManager();
    // let cRData;

    const createUnitCtx = useContext(CreateUnitContext);
    const facilityData = createUnitCtx.unitData.facilities
        ? createUnitCtx.unitData.facilities
        : [];

    const { isLoading, fetchFacilities } = useAttributeManager();

    const [facilities, setFacilities] = useState([]);

    const [cRSelectedValue, setCRSelectedValue] = useState("1");
    const [kSSelectedValue, setKSSelectedValue] = useState("1");
    const [otherFacility, setOtherFacility] = useState([]);

    const comfortRoomHandler = (data) => {
        setCRSelectedValue(data);
    };

    const kitchenSinkHandler = (data) => {
        setKSSelectedValue(data);
    };

    const otherHandler = (data) => {
        setOtherFacility(data);
    };

    const backHandler = (event) => {
        event.preventDefault();

        const otherFacilityArray =
            otherFacility.length !== 0
                ? otherFacility.map((facility) => ({
                      id: Number(facility),
                      is_shared: 0,
                  }))
                : [];

        let data = [
            {
                id: facilities
                    .filter((cr) => cr.name === "Comfort Room")
                    .map((cr) => cr.id)
                    .join(""),
                is_shared: cRSelectedValue,
            },
            {
                id: facilities
                    .filter((ks) => ks.name === "Kitchen Sink")
                    .map((ks) => ks.id)
                    .join(""),
                is_shared: kSSelectedValue,
            },
        ];

        data = data.concat(otherFacilityArray);

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            facilities: data,
        });

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const otherFacilityArray =
            otherFacility.length !== 0
                ? otherFacility.map((facility) => ({
                      id: Number(facility),
                      is_shared: 0,
                  }))
                : [];

        let data = [
            {
                id: facilities
                    .filter((cr) => cr.name === "Comfort Room")
                    .map((cr) => cr.id)
                    .join(""),
                is_shared: cRSelectedValue,
            },
            {
                id: facilities
                    .filter((ks) => ks.name === "Kitchen Sink")
                    .map((ks) => ks.id)
                    .join(""),
                is_shared: kSSelectedValue,
            },
        ];

        data = data.concat(otherFacilityArray);

        createUnitCtx.onUnitData({
            ...createUnitCtx.unitData,
            facilities: data,
        });

        onNext();
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

    return (
        <form
            className={`${styles["basic-details-form"]}`}
            onSubmit={submitHandler}
        >
            {/* {isLoading && "Loading..."} */}
            {isLoading ? (
                "Loading..."
            ) : (
                <div className={`${styles["facilities-container"]}`}>
                    <div>
                        <ComfortRoom
                            comfortRoom={facilities.filter(
                                (cr) => cr.name === "Comfort Room"
                            )}
                            selectedValue={cRSelectedValue}
                            onComfortRoom={comfortRoomHandler}
                        />
                    </div>
                    <div>
                        <KitchenSink
                            kitchenSink={facilities.filter(
                                (ks) => ks.name === "Kitchen Sink"
                            )}
                            selectedValue={kSSelectedValue}
                            onKitchenSink={kitchenSinkHandler}
                        />
                    </div>
                    <div>
                        <Others
                            otherFacilities={facilities.filter(
                                (facility) =>
                                    facility.name !== "Kitchen Sink" &&
                                    facility.name !== "Comfort Room"
                            )}
                            onOther={otherHandler}
                        />
                    </div>
                </div>
            )}

            <div className={`${styles["basic-details-button"]}`}>
                <BorderlessButton onClick={backHandler}>Back</BorderlessButton>
                <PrimaryButton
                    // disabled={inclusionValue.length === 0}
                    rightIcon={<EastIcon />}
                >
                    Next
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FacilitiesForm;
