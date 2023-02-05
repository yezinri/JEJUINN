import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoogleToken, getUserInfoByToken } from '../../store/user';
import { getGoogleAccessToken } from '../../api/google';

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth_code = window.location.search.split('=')[1].split('&')[0];

  async function getGoogleUser() {
    // 인가코드로 구글 서버에서 accessToken 가져오기
    const access_token = (await getGoogleAccessToken(auth_code)).data.access_token;
    // 구글 서버에서 받은 accessToken을 우리 BE서버로 보내서 정보 가져오기
    const data = dispatch(getGoogleToken(access_token));
    dispatch(getUserInfoByToken(data));
    navigate('/');
  }
  useEffect(() => {
    getGoogleUser();
  });


  return <div></div>;
}
