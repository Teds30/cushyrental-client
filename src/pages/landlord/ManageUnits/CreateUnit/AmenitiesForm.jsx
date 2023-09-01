import { useState, useEffect } from "react";

import useAttributeManager from "../../../../hooks/data/attribute-hook";
import ChipBig from "../../../../components/Chips/ChipBig";

const AmenitiesForm = (props) => {
  const { isLoading, fetchAmenities } = useAttributeManager();
  const [ amenities, setAmenities ] = useState([]);

  const chipValueHandler = (value) => {

  }

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
    <form>
      <div className="title">What amenities do your unit offer?</div>

      {/* {isLoading ? 'Loading...' : 'Data is fetch suceesfully!'} */}
      {isLoading ? 'Loading...' : <ChipBig items={amenities} onChipValue={chipValueHandler} />}
    </form>
  );
};

export default AmenitiesForm;
