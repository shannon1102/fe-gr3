import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./addressSelect.css"
import Grid from '@material-ui/core/Grid'

import TextField from '@mui/material/TextField';

// export default function HelperTextMisaligned() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         '& > :not(style)': { m: 1 },
//       }}
//     >
    
//     </Box>
//   );
// }

export default function AddressSelect({label,placeholder}) {
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [street, setStreet] = React.useState('');

  const [detail, setDetail] = React.useState('');
  const [numberHome, setNumberHome] = React.useState('');
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
 const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };
  const handleDetailChange = (event) => {
    setStreet(event.target.value);
  };
  const handleHomeNumberChange =(event) =>{
    setNumberHome(event.target.value)

  }
 


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150, width:200}}>

      <Grid container>
     <Grid item xs={6}> 
         ... 
     </Grid>
     <Grid item xs={6}>
         ...
     </Grid>
    </Grid>

      <FormHelperText className="address__label" >Tỉnh/Thành phố</FormHelperText>
        <Select className="address__select"
          value={city}
          onChange={handleCityChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
      {/* </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
      <FormHelperText className="address__label" >Quận/Huyện</FormHelperText>
        <Select className="address__select"
          value={district}
          onChange={handleDistrictChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
      {/* </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
      <FormHelperText className="address__label" >Phường/Xã</FormHelperText>
        <Select className="address__select"
          value={street}
          onChange={handleStreetChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
      {/* </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
        <FormHelperText className="address__label" >Địa chỉ chính xác</FormHelperText>
        <Select className="address__select"
          value={detail}
          onChange={handleDetailChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
       
        {/* </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
      <FormHelperText className="address__label" >Số nhà</FormHelperText>
        <TextField id="numberHome" value={numberHome}
          onChange={handleHomeNumberChange}/>
      </FormControl>

    </div>
  );
}
