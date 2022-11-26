import PropTypes from 'prop-types';
import { useState } from 'react';

import { Box, Stack, Button, FormControl, InputLabel, Select, ButtonGroup, MenuItem } from '@mui/material';

import Iconify from '../../../../components/Iconify';

RequestManageItem.propTypes = {
  setNewQuantity: PropTypes.number,
};

export default function RequestManageItem(props) {
  // eslint-disable-next-line
  const { setNewQuantity } = props;
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const addButton = () => {
    setAmount(amount + 1);
  };

  const minusButton = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    } else {
      setAmount(0);
    }
  };

  const submitForm = () => {
    if (amount > 0 && item > 0) {
      setNewQuantity(amount);
      setAmount(0);
      setItem('');
      // alert(amount);
    } else {
      alert('Invalid amount. Try again.');
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Stack sx={{ alignItems: 'center' }}>
        <FormControl sx={{ m: 1, minWidth: 120, pb: 3 }}>
          <InputLabel>Item</InputLabel>
          <Select value={item} label="Item" onChange={handleChange}>
            <MenuItem value={1}>Table</MenuItem>
            <MenuItem value={2}>Chairs</MenuItem>
            <MenuItem value={3}>Tent</MenuItem>
          </Select>
        </FormControl>

        <ButtonGroup sx={{ pb: 3 }}>
          <Button variant="contained" onClick={addButton}>
            <Iconify icon="carbon:add" />
          </Button>
          <Button disabled="true" variant="outlined">
            {amount}
          </Button>
          <Button variant="contained" color="error" onClick={minusButton}>
            <Iconify icon="carbon:subtract" />
          </Button>
        </ButtonGroup>

        <Button variant="contained" component="submit" onClick={submitForm}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
