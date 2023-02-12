import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { getPasswordCode } from '../../api/user';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#535353',
      opacity: '83%',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
  marginTop: '1rem',
  width: '80%',
});

const CustomTextField1 = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      // borderColor: nickNameTestResult() ? '#0011ff' : '#535353',
      borderColor: '#535353',
      // borderColor: '#3bd643',
      opacity: '83%',
    },
    '&:hover fieldset': {
      // borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
  width: '80%',
});

export default function FindPasswordForm() {
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [userUid, setUserUid] = useState('');

  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState('');
  // 인증 번호 받기 눌렀을 때 로직
  // 응답에 따라서 인증번호 입력칸을 활성화 할지
  // 아니면 alert를 실행할지
  const getCode = async () => {
    const res = (await getPasswordCode(email)).data;
    switch (res.status) {
      case 200:
        setCode(res.code);
        setUserUid(res.userUid);
        return alert('이메일로 인증번호가 전송되었습니다.');
    }
  };

  const confirmCode = () => {
    if (code === checkCode) {
      setChecked(true);
    } else {
      alert('인증번호가 틀렸습니다.');
    }
  };

  const [checked, setChecked] = useState(false);

  // 비밀번호 형식
  const [newPW, setNewPW] = useState('');
  const passwordTest = /^(?=.*?[a-z])(?=.*?[0-9]).{7,15}$/;
  const passwordTestResult = () => passwordTest.test(newPW);

  // 비밀번호 체크
  const [newPWCheck, setNewPWCheck] = useState('');
  const passwordCheckResult = () =>
    newPWCheck === newPW && passwordTest.test(newPWCheck);

  const completedBoxStyle = (condition) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: condition ? '#41ff7a' : '#535353',
        opacity: '83%',
      },
      '&:hover fieldset': {
        borderColor: condition ? '#41ff7a' : '#535353',
      },
      '&.Mui-focused fieldset': {
        borderColor: condition ? '#41ff7a' : 'primary.main',
      },
      '&.Mui-error fieldset': {
        borderColor: !condition && '#ff0000',
      },
    },
    width: '80%',
  });

  const completedLabelStyle = (condition) => ({
    color: condition ? '#41ff7a' : '#535353',
    '&.Mui-focused': {
      color: condition ? '#41ff7a' : 'primary.main',
    },
    '&.Mui-error': {
      color: !condition && '#ff0000',
      fontWeight: 'bolder',
    },
  });

  return (
    <Box
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3vh',
      }}
    >
      <h1>비밀번호 재발급</h1>
      <CustomTextField
        label="이메일"
        name="email"
        value={email}
        type="email"
        onChange={(e) => {
          handleEmail(e);
          setChecked(false);
          setCheckCode('');
          setUserUid('');
        }}
        size="small"
      />
      <Button
        onClick={getCode}
        variant="contained"
        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        size="small"
      >
        인증 번호 받기
      </Button>

      <CustomTextField
        label="인증번호 입력"
        name="인증번호 입력"
        value={checkCode}
        onChange={(e) => setCheckCode(e.target.value)}
        disabled={code.length === 0}
        size="small"
      />
      <Button
        onClick={confirmCode}
        size="small"
        variant="contained"
        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        인증 번호 확인
      </Button>

      <CustomTextField
        sx={completedBoxStyle(passwordTestResult())}
        InputLabelProps={{
          sx: completedLabelStyle(passwordTestResult()),
        }}
        required
        label="새로운 비밀번호"
        type="password"
        name="password"
        value={newPW}
        onChange={(e) => {
          setNewPW(e.target.value);
        }}
        helperText="소문자, 숫자 포함 7 ~ 15글자"
        size="small"
        error={Boolean(newPW.length > 0 && passwordTestResult() === false)}
      />
      <CustomTextField1
        sx={completedBoxStyle(passwordCheckResult())}
        InputLabelProps={{
          sx: completedLabelStyle(passwordCheckResult()),
        }}
        required
        label="새로운 비밀번호 확인"
        type="password"
        name="checkPassword"
        value={newPWCheck}
        onChange={(e) => {
          setNewPWCheck(e.target.value);
        }}
        size="small"
        helperText="소문자, 숫자 포함 7 ~ 15글자"
        error={Boolean(
          newPWCheck.length > 0 && passwordCheckResult() === false,
        )}
      />
      <Button
        variant="contained"
        disabled={!(passwordCheckResult() && passwordTestResult())}
      >
        비밀번호 변경
      </Button>
    </Box>
  );
}
