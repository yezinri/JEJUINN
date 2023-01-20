import React from 'react';
import { images } from '../../assets/images';

export default function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <img
        src={images.kakao_login}
        alt="카카오 로그인"
        onClick={handleLogin}
        style={{
          height: '2rem',
          cursor: 'pointer',
        }}
      />
    </>
  );
}
