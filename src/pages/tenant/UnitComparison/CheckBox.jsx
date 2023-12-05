import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

const CheckBox = (props) => {
    const { items = [], selectedValue = [], onSelectedUsers = () => {}, isChecked = (false), isDisabled = false, labelSize = 'auto', checkBoxSize = 'auto'} = props;

    const [ checkItems, setCheckItems ] = React.useState(selectedValue.length !== 0 ? selectedValue : []);

    const checkedItemsHandler = (item) => {
        const updatedItems = checkItems.filter(checkItem => {return checkItem !== item.id});
        if (updatedItems.length !== checkItems.length) {
          setCheckItems(updatedItems);
          onSelectedUsers(updatedItems);
          return;
        }
        setCheckItems((prevCheckItems) => [...prevCheckItems, item.id]);
        onSelectedUsers((prevCheckItems) => [...prevCheckItems, item.id]);
    };

    // console.log(checkItems.find(checkItem => checkItem.id === 1));
    // console.log(selectedValue);

    React.useEffect (() => {
      setCheckItems(selectedValue);
    },[selectedValue]);
    // React.useEffect(() => {
    //     props.onCheckBox(checkItems);
    // }, [checkItems]);

    const content = items.map(item => {
        if (selectedValue.includes(item.id)) {
            return (<FormControlLabel
                control={
                  
                  <Checkbox
                    disabled={isDisabled !== false ? true : false}
                    checked={checkItems.find(checkItem => checkItem === item.id) ? true : false}
                    onChange={() => checkedItemsHandler(item)}
                    sx={{
                      height: checkBoxSize,
                      width: checkBoxSize,
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
                sx={{"& span": {fontSize: labelSize, fontFamily: 'inter'} }}
              />)
        }
    });

    return (
      <FormGroup>
        {content}
      </FormGroup>
    );
};

export default CheckBox;