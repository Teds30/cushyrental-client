import { Rating } from "@mui/material";

const UnitRating = (props) => {
    const {rating} = props;

    return (<Rating
        readOnly
        value={rating}
        precision={0.5}
        sx={{
            fontSize: "13px",
            color: "var(--fc-body)",
            "& svg": {
                fill: "var(--fc-body)",
            },
        }}
    />);
};

export default UnitRating;