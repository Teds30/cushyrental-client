import { Fragment } from "react";
import Unit from "./Unit";

const Units = (props) => {
    const { userUnits } = props;

    const content = userUnits.map(unit => <Unit key={unit.id} user_unit={unit} />)

    return (
        <Fragment>
            { content }
        </Fragment>
    );
};

export default Units;
