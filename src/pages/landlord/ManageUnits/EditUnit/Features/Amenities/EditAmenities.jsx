import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChipBig from "../../../../../../components/Chips/ChipBig";
import useAttributeManager from "../../../../../../hooks/data/attribute-hook";
import useUserManager from "../../../../../../hooks/data/users-hook";
import PrimaryButton from "../../../../../../components/Button/PrimaryButton";
import useNotistack from "../../../../../../hooks/notistack-hook";
import useUnitManager from "../../../../../../hooks/data/units-hook";

import styles from "./EditAmenities.module.css";

const EditAmenities = (props) => {
    const { unitAmenities, unitId } = props;
    console.log(unitAmenities);

    const { fetchAmenities } = useAttributeManager();
    const { notify } = useNotistack();
    const navigate = useNavigate();
    const { deleteUnitAmenity, editUnitAmenity, isLoading } = useUnitManager();

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState(unitAmenities);

    // const { updateUserAmenities, isLoading } = useUserManager();

    const chipAmenityHandler = async (value) => {
        setSelectedAmenities(value);
    };

    const saveAmenityHandler = async (event) => {
        event.preventDefault();

        // let isFinished = false;

        if (selectedAmenities.length === 0) {
            return;
        }

        let data = amenities
            .filter((amenity) => !selectedAmenities.includes(amenity.id))
            .map((amenity) => ({ ...amenity, unit_id: Number(unitId) }));

        if (data.length !== 0) {
            const res = await deleteUnitAmenity(data);
            console.log(res);
        } else {
            data = amenities
            .filter((amenity) => selectedAmenities.includes(amenity.id))
            .map((amenity) => ({ ...amenity, unit_id: Number(unitId) })); 

            const res = await editUnitAmenity(data);
            console.log(res);
        }

        navigate("/manage_unit/edit/" + unitId);
        notify("Amenities save successfully", "success");

        // selectedAmenities.forEach(async (element, index) => {
        //     try {
        //         const data = {
        //             unit_id: Number(unitId),
        //             amenity_id: element.toString(),
        //         };
        //         const res = await updateUserAmenities(data);
        //     } catch (error) {}

        //     if (index === selectedAmenities.length - 1) {
        //         navigate("/manage_unit/edit/" + unitId);
        //         notify("Amenities save successfully", "success");
        //         return;
        //     }
        // });
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAmenities();
                console.log(res);
                setAmenities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <form onSubmit={saveAmenityHandler}>
            <div className={`${styles["feature-main"]}`}>
                <div className={`${styles["amenity-main-title"]}`}>
                    <p className="title">Choose unit amenities</p>
                </div>

                <div className={`${styles["amenity-chip-col"]}`}>
                    <ChipBig
                        items={amenities}
                        selected={selectedAmenities}
                        onChipValue={chipAmenityHandler}
                    />
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
    );
};

export default EditAmenities;
