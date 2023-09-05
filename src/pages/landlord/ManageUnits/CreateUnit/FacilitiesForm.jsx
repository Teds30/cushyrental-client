import { useState, useEffect, useContext, Fragment } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderlessButton from "../../../../components/Button/BorderlessButton";
import CreateUnitContext from "../../../../context/create-unit-context";
import ComfortRoom from "./FacilityComponent/ComfortRoom";
import Others from "./FacilityComponent/Others";

import styles from "./CreateUnit.module.css";
import EastIcon from "@mui/icons-material/East";
import KitchenSink from "./FacilityComponent/KitchenSink";

const FacilitiesForm = (props) => {
    const { onBack, onNext } = props;
    let cRData;

    const createUnitCtx = useContext(CreateUnitContext);
    const facilityData = createUnitCtx.unitData.facilities
        ? createUnitCtx.unitData.facilities
        : [];

    const { isLoading, fetchFacilities } = useAttributeManager();

    const [facilities, setFacilities] = useState([]);

    const [cRSelectedValue, setCRSelectedValue] = useState('1');
    const [kSSelectedValue, setKSSelectedValue] = useState("1");
    const [otherFacility, setOtherFacility] = useState([]);

    const comfortRoomHandler = (data) => {
        console.log(data);
        setCRSelectedValue(data);
    };

    const kitchenSinkHandler = (data) => {
        console.log(data);
        setKSSelectedValue(data);
    };

    const otherHandler = (data) => {
        setOtherFacility(data);
        console.log(data);
    };

    const backHandler = (event) => {
        event.preventDefault();

        const data = [
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

        if (otherFacility.length !== 0) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                facilities: [...otherFacility, data],
            });
        } else {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                facilities: data,
            });
        }

        onBack();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (otherFacility.length !== 0) {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                facilities: [...otherFacility, data],
            });
        } else {
            createUnitCtx.onUnitData({
                ...createUnitCtx.unitData,
                facilities: data,
            });
        }

        setCRSelectedValue("1");
        setKSSelectedValue("1");
        // setInclusionValue([]);

        // onNext();
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
