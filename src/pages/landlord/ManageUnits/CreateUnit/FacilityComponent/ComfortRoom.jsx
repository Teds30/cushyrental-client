import { Fragment, useState } from "react";
import RadioButton from "../../../../../components/RadioButton/RadioButton";

import styles from '../CreateUnit.module.css';

const comfort_room = [
    {
        id: '1',
        name: "Owned",
    },
    {
        id: '2',
        name: "Shared",
    },
];

const ComfortRoom = (props) => {
    const { comfortRoom, selectedValue, onComfortRoom } = props;

    const [cRValue, setCRValue] = useState(selectedValue);

    const selectedValueHandler = (data) => {
        setCRValue(data);
        onComfortRoom(data);
    };

    const content = comfortRoom.map((data) => (
        <Fragment key={data.id}>
            <div className={`${styles.title}`} style={{ marginBottom: "12px" }}>
                {data.name}
            </div>
            <RadioButton
                items={comfort_room}
                onSelectedValue={selectedValueHandler}
                selectedValue={cRValue}
                button={true}
            />
        </Fragment>
    ));

    return content;
};

export default ComfortRoom;
