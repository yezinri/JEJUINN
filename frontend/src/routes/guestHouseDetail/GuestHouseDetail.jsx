import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import GuestHouseInfo from '../../components/guestHouseDetail/GuestHouseInfo';
import GuestHouseContent from '../../components/guestHouseDetail/GuestHouseContent';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import MapApi from '../../components/mapApi/MapApi';
import {
  guestHouseDetail,
  guestHouseDelete,
  getMyLikedGuestHouseList,
  likeGuestHouse,
  dislikeGuestHouse,
} from '../../api/guestHouse';
import { selectAccessToken, selectUserInfo } from '../../store/user';
import CommentsList from '../../components/commentComponent/CommentsList';

export default function GuestHouseDetail() {
  const location = useLocation();
  const guestHouseUid = location.pathname.split('detail/')[1];
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);

  const [spots, setSpots] = useState([]);
  const [guestHouse, setGuestHouse] = useState([]);
  const [likedGuestHouses, setLikedGuestHouses] = useState([]);
  const [likeState, setLikeState] = useState(0);

  async function getGuestHouseDetail() {
    const data = (await guestHouseDetail(guestHouseUid)).data;
    setGuestHouse(data);
    const info = data.guestHouse;
    setSpots([
      {
        id: info.uid,
        lat: info.lat,
        lng: info.lng,
      },
    ]);
  }

  const getLikedGuestHouses = async () => {
    if (!accessToken) return;
    const { data } = await getMyLikedGuestHouseList(accessToken);
    setLikedGuestHouses(data);
  };

  useEffect(() => {
    getGuestHouseDetail();
    getLikedGuestHouses();
  }, []);

  useEffect(() => {
    console.log(likeState);
  }, [likeState]);

  useEffect(() => {
    if (userInfo) {
      const exist = likedGuestHouses.find(
        (elem) => elem.guestHouse.uid == guestHouseUid,
      );
      if (exist) setLikeState(2);
      else setLikeState(1);
    }
  }, [likedGuestHouses]);

  const navigate = useNavigate();
  const goModifiy = () => {
    navigate(`/guesthouse/update/${guestHouseUid}`);
  };

  async function DeleteGuestHouse() {
    guestHouseDelete(accessToken, guestHouseUid);
    alert('게스트하우스가 삭제되었습니다.');
    navigate('/guesthouse');
  }

  const handleLikeGuestHouse = async () => {
    await likeGuestHouse(accessToken, guestHouseUid);
    getLikedGuestHouses();
  };

  const handleCancleLikeGuestHouse = async () => {
    await dislikeGuestHouse(accessToken, guestHouseUid);
    getLikedGuestHouses();
  };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 수정', handle: goModifiy },
    {
      icon: <DeleteOutlineIcon />,
      name: '글 삭제',
      handle: DeleteGuestHouse,
    },
  ];

  return (
    <>
      {userInfo?.uid === guestHouse?.guestHouse?.representativeUid && (
        <SpeedDialComponent actions={actions} />
      )}
      <Box sx={{ paddingY: '2rem', paddingX: '19%' }}>
        <Typography variant="h4" color="primary" sx={{ marginY: '15px' }}>
          | {guestHouse?.guestHouse?.guestHouseName}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Grid item xs={12}>
              <WhiteBox
                cpn={<GuestHouseInfo guestHouse={guestHouse.guestHouse} />}
              />
            </Grid>
            <Grid item xs={12}>
              <WhiteBox cpn={<MapApi spots={spots} startSpot={spots} />} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <WhiteBox
                cpn={
                  <GuestHouseContent
                    guestHouse={guestHouse.guestHouse}
                    images={guestHouse.images}
                    likeState={likeState}
                    handleLikeGuestHouse={handleLikeGuestHouse}
                    handleCancleLikeGuestHouse={handleCancleLikeGuestHouse}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <WhiteBox
                cpn={
                  <Box px="3%" mt="10px">
                    <CommentsList />
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
