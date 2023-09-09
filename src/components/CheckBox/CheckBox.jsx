import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

const CheckBox = (props) => {
    const { items = [], selectedValue = [] } = props;

    const [ checkItems, setCheckItems ] = React.useState(selectedValue.length !== 0 ? selectedValue : []);

    const checkedItemsHandler = (item) => {

        const updatedItems = checkItems.filter(checkItem => checkItem.id !== item.id);

        if (updatedItems.length !== checkItems.length) {
          setCheckItems(updatedItems);
          return;
        }

        setCheckItems((prevCheckItems) => [...prevCheckItems, item]);
    };

    React.useEffect(() => {
        props.onCheckBox(checkItems);
    }, [checkItems]);

    console.log(selectedValue);
    const content = items.map(item => (<FormControlLabel
        control={
          
          <Checkbox
            onChange={() => checkedItemsHandler(item)}
            sx={{
              border: 'var(--accent)',
              color: "var(--accent)",
              "&.Mui-checked": {
                color: "var(--accent)",
              },
              "&:hover": {
                color: "var(--accent)",
              }
            }}
          />
        }
        key={item.id}
        label={item.name}
      />));

    return (
      <FormGroup>
        {content}
      </FormGroup>
    );
};

export default CheckBox;