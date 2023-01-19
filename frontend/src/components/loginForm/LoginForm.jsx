import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import NaverLoginBtn from './NaverLogin';

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
  marginTop: '2vh',
  width: '80%',
});

export default function LoginForm() {
  return (
    <form
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh',
      }}
    >
      <h1>로그인</h1>
      <CustomTextField label="아이디" />
      <CustomTextField label="비밀번호" />

      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <Button
        href="/signup1"
        sx={{
          width: '80%',
          height: '6vh',
          background: '#FF7600',
          borderRadius: '38px',
          color: 'white',
          '&:hover': {
            color: 'white',
            background: '#FF7600',
          },
          border: 'none',
          fontSize: '1.5vw',
          marginTop: '6vh',
        }}
      >
        로그인
      </Button>

      {/* 소셜 로그인 부분 */}
      <h3 style={{ marginTop: '4vh', color: '#FF7600' }}>소셜 로그인</h3>
      <Box sx={{ display: 'flex', gap: '1.5vw' }}>
        {/* {socialBtn('images/naver_login.png', initializeNaverLogin)} */}
        <NaverLoginBtn />
        {socialBtn('images/kakao_login.png')}
        {socialBtn('images/google_login.png')}
        {socialBtn1({ src: 'images/kakao_login.png', handle: handleLogin })}
      </Box>

      {/* 회원가입 및 유저 정보 찾기 부분 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4vh',
        }}
      >
        {findBtn('회원가입')}
        <p style={{ margin: '1rem', fontSize: '1vw' }}>|</p>
        {findBtn('아이디 찾기')}
        <p style={{ margin: '1rem', fontSize: '1vw' }}>|</p>
        {findBtn('비밀번호 찾기')}
      </Box>
    </form>
  );
}

const findBtn = (inp) => {
  return <p style={{ fontSize: '1vw' }}>{inp}</p>;
};

const socialBtn = (src, onClickMethod) => {
  return (
    <Button onClick={onClickMethod}>
      <img
        src={src}
        alt=""
        style={{
          height: '2rem',
        }}
      />
    </Button>
  );
};

const socialBtn1 = (data) => {
  return (
    <img
      src={data.src}
      alt="왜안돼"
      onClick={data.handle}
      style={{
        height: '2rem',
      }}
    />
  );
};

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const handleLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};
