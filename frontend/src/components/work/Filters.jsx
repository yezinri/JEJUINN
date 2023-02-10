import { useEffect, useState } from 'react';
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

function FilterArea({ value, setValue }) {
  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      limitTags="3"
      options={selectedSections.map((option) => option)}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="선호하는 지역"
          placeholder="원하는 지역을 입력하세요"
        />
      )}
    />
  );
}

function FilterDate({ value, setValue }) {
  const handelOnChange = (event) => {
    setValue(event.$d.toISOString().split('T')[0]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="입도가능날짜"
        value={value}
        inputFormat="YYYY-MM-DD"
        mask={'____-__-__'}
        onChange={(newValue) => {
          handelOnChange(newValue);
        }}
        renderInput={(params) => (
          <CustomTextField {...params} sx={{ width: '100%' }} />
        )}
      />
    </LocalizationProvider>
  );
}

function FilterStyle({ value, setValue }) {
  const wishStyles = [
    '꼼꼼',
    '대처 능력',
    '빠른 습득',
    '빠른 일처리',
    '스탭 경험자',
    '아침형 인간',
    '열정',
    '의사소통 기술',
    '저녁형 인간',
    '책임감',
    '친절함',
    '활발한 성격',
  ];

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      limitTags={3}
      options={wishStyles.map((option) => option)}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // onInputChange={(event, newInputValue) => {
      //   setInputValue(newInputValue);
      // }}
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
