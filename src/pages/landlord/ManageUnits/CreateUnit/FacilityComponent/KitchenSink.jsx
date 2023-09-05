import { Fragment, useState } from "react";
import RadioButton from "../../../../../components/RadioButton/RadioButton";

const kitchen_sink = [
    {
        id: "1",
        name: "Owned",
    },
    {
        id: "2",
        name: "Shared",
    },
];

const KitchenSink = (props) => {
    const { kitchenSink, selectedValue, onKitchenSink } = props;

    const [ kSValue, setKSValue ] = useState(selectedValue);

    const selectedValueHandler = (data) => {
        setKSValue(data);
        onKitchenSink(data);
    };

    const content = kitchenSink.map((data) => (
        <Fragment key={data.id}>
            <div className="title" style={{ marginBottom: "12px" }}>
                {data.name}
            </div>
            <RadioButton
                items={kitchen_sink}
                onSelectedValue={selectedValueHandler}
                selectedValue={kSValue}
                button={true}
            />
        </Fragment>
    ));

    return content;
};

export default KitchenSink;
