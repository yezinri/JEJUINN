import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box } from '@mui/system';
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
      height: '6vh',
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

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#ac002b',
  },
});

export default function StaffPickFilter({ getFilter, filter }) {
  const selectedTypes = ['전체', '자연', '놀거리', '볼거리', '먹거리'];
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

  const [pickForm, setPickForm] = useState(filter);
  const handlePickForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPickForm({ ...pickForm, [name]: value });
  };

  return (
    <form
      style={{
        height: '23rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '3vh 3vh 3vh 3vh',
          gap: '4vh',
        }}
      >
        <CustomTextField
          id="outlined-select-currency"
          select
          label="유형별"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: '#FF7600' }}>
                <GroupsIcon />
              </InputAdornment>
            ),
          }}
          value={pickForm.type}
          onChange={handlePickForm}
          name="type"
          defaultValue={'전체'}
          // 여이가 라벨 사이즈 조정하는곳
          // 근데 라벨 들어가는 칸은 조정이 안됨 ㅋ
          // InputLabelProps={{ style: { fontSize: '18px' } }}
        >
          {selectedTypes.map((selectedtype) => (
            <MenuItem key={uuidv4()} value={selectedtype}>
              {selectedtype}
            </MenuItem>
          ))}
        </CustomTextField>

        <CustomTextField
          id="outlined-select-currency"
          select
          label="지역별"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: '#FF7600' }}>
                <FmdGoodOutlinedIcon />
              </InputAdornment>
            ),
          }}
          value={pickForm.section}
          onChange={handlePickForm}
          name="section"
        >
          {selectedSections.map((selectedSection) => (
            <MenuItem key={uuidv4()} value={selectedSection}>
              {selectedSection}
            </MenuItem>
          ))}
        </CustomTextField>

        <CustomTextField
          label="검색어로 찾기"
          name="inp"
          value={pickForm.inp}
          onChange={handlePickForm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: '#FF7600' }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="검색어를 입력하세요"
        />
        <CustomButton
          variant="contained"
          sx={{
            borderRadius: '62px',
            backgroundColor: '#FF7600',
            fontFamily: 'border',
          }}
          size="large"
          startIcon={<SearchIcon />}
          onClick={(e) => {
            e.preventDefault();
            getFilter(pickForm);
          }}
        >
          조건 검색
        </CustomButton>
      </Box>
    </form>
  );
}