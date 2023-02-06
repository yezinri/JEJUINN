import { useState } from 'react';
import { styled, TextField, InputAdornment, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomTextField = styled(TextField)({
  '& label': {
    color: '#000000',
    marginTop: '2px',
  },
  '& label.Mui-focused': {
    color: '#FF7600',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d1d1d1',
      opacity: '83%',
      height: '100%',
      borderRadius: '62px',
      margin: 'auto',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
});

const selectedSections = [
  '전체',
  '서귀포시',
  '제주시',
  '한경면',
  '한림읍',
  '애월읍',
  '조천읍',
  '구좌읍',
  '성산읍',
  '표선면',
  '남원읍',
  '안덕면',
  '대정읍',
  '우도면',
];

function FilterName({ onName }) {
  return (
    <CustomTextField
      label="게스트하우스 이름"
      placeholder="입력"
      onInput={onName}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ color: '#FF7600' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    ></CustomTextField>
  );
}

function FilterArea({ onArea }) {
  return (
    <CustomTextField
      sx={{ width: '100%' }}
      label="선호하는 지역"
      select
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ color: '#FF7600' }}>
            <FmdGoodOutlinedIcon />
          </InputAdornment>
        ),
      }}
      onChange={onArea}
    >
      {selectedSections.map((selectedSection) => (
        <MenuItem key={uuidv4()} value={selectedSection}>
          {selectedSection}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function FilterDate({ onStartDate }) {
  const [selectDate, setSelectDate] = useState();
  const twoCalls = (imp) => {
    handleDate(imp);
    onStartDate(imp);
  };
  const handleDate = (inIsland) => {
    setSelectDate(inIsland);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="입도가능날짜"
        value={selectDate}
        onChange={(newValue) => {
          twoCalls(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

function FilterStyle({ onStyleTags }) {
  const wishStyles = ['파티', '조용한', '술', '나혼자'];
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      multiple
      limitTags={3}
      options={wishStyles.map((option) => option)}
      freeSolo
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onStyleTags(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="스타일"
          placeholder="원하는 스타일을 입력하세요"
        />
      )}
    />
  );
}

export { FilterDate, FilterArea, FilterName, FilterStyle };