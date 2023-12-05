import { useEffect, useState } from "react";
import useAttributeManager from "../../../hooks/data/attribute-hook";
import CheckBox from "./CheckBox";
import styles from './UnitComparison.module.css';

const UnitAmenities = (props) => {
    const { amenitiesId } = props;

    const { fetchAmenities, isLoading } = useAttributeManager();
    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchAmenities();
                setAmenities(res);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    const content = amenities.map((amenity) => {
        return (
            
                <CheckBox
                // checkBoxSize={'30px'}
                labelSize={'10px'}
                key={amenity.id}
                isDisabled={'True'}
                items={[amenity]}
                selectedValue={amenitiesId}
            />
        );
    });

    return !isLoading && amenities.length !== 0 && (<div className={`${styles['attributes']}`}>{content}</div>);
};

export default UnitAmenities;
