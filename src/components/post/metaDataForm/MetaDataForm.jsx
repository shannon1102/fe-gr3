import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./metaDataForm.css"

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';


//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         '& > :not(style)': { m: 1 },
//       }}
//     >


export default function MetaDataForm() {
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [street, setStreet] = React.useState('');

  const [detail, setDetail] = React.useState('');
  const [numberHome, setNumberHome] = React.useState('');
  const handleCategoryChange = (event) => {
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
      <FormControl sx={{ m: 1, minWidth: 350, width:600}}>
        <FormHelperText className="metaDataForm__label" >Loại chuyên mục</FormHelperText>
        <Select className="category__select"
          value={city}
          onChange={handleCategoryChange}
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
        <FormHelperText className="metaDataForm__label" >Tiêu đề</FormHelperText>
        <TextField id="numberHome" value={numberHome}
          onChange={handleHomeNumberChange}/>
      {/* </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
        <FormHelperText className="metaDataForm__label" >Thông tin mô tả</FormHelperText>
        <TextareaAutosize id="numberHome" value={numberHome}
          onChange={handleHomeNumberChange}
          maxRows ={20}
          minRows = {5}
          />
      {/* </FormControl>
     <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
        <FormHelperText className="metaDataForm__label" >Thông tin liên hệ</FormHelperText>
        <TextField id="numberHome" value={numberHome}
            onChange={handleHomeNumberChange}/>
     {/* </FormControl>
     <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
       <FormHelperText className="metaDataForm__label" >Giá cho thuê</FormHelperText>
       <TextField id="numberHome" value={numberHome}
              onChange={handleHomeNumberChange}/>
     {/* </FormControl>
     <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
       <FormHelperText className="metaDataForm__label" >Diện tích</FormHelperText>
      <TextField id="numberHome" value={numberHome}
                onChange={handleHomeNumberChange}/>
     {/* </FormControl>
     <FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
          <FormHelperText className="metaDataForm__label" > Đối tượng cho thuê</FormHelperText>
           <TextField id="numberHome" value={numberHome}
             onChange={handleHomeNumberChange}/>
     </FormControl>
     </div>
  );
}
