import { useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
// import StaffPickRank from '../../components/staffPickComponent/StaffPickRank';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickReviews from '../../components/staffPickComponent/StaffPickReviews';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import { useNavigate } from 'react-router-dom';
// import { getReviews } from '../../api/staffPick';
// import { getSpots } from '../../api/staffPick';
export default function StaffPick() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    type: '전체',
    section: '전체',
    inp: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };
  const [selectedSpot, setSelectedSpot] = useState({ uid: '', name: '' });

  const [spotReviews, setSpotReviews] = useState([]);

  // 클릭한 명소의 uid, name을 받고
  // uid를 이용해 해당 명소의 리뷰 리스트를 받아오는 로직
  // 나중에 fetch 우리서버랑 통신으로 바꿔줘야함
  //
  const selectSpot = (e) => {
    const uid = e.target.id;
    const name = e.target.name;
    setSelectedSpot({ uid, name });
    fetch(`dataPractice/reviews_${uid}.json`)
      .then((res) => res.json())
      .then((json) => setSpotReviews(json));
    // 위에 패치 지우고 아래 주석 해제  -> 전체함수 selectSpot 에 async 붙여줘야함
    // const reviews = await getReviews()
    // setSpotReviews(reviews)
  };

  const deleteSelected = () => {
    setSelectedSpot({ uid: '', name: '' });
    setSpotReviews([]);
  };
  const goCreate = () => {
    navigate('create');
  };

  // const testapi = () => {
  //   axios({
  //     method: 'get',
  //     url: 'http://i8a603.p.ssafy.io:8080/api/test',
  //   }).then(console.log);
  // };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate },
    // { icon: <ModeEditOutlinedIcon />, name: '테스트', handle: testapi },
  ];

  const spots = [
    { id: 1, lat: 33.4485, lng: 126.5631 },
    { id: 2, lat: 33.478, lng: 126.4948 },
    { id: 3, lat: 33.4664, lng: 126.6694 },
    { id: 4, lat: 33.2856, lng: 126.4449 },
  ];

  // spots 정보 저장할 함수
  // const [spots, setSpots] = useState([])
  /**
   * 놀고먹기 처음 들어갔을 때 전체 명소 리스트 받는 함수
   */
  // const getSpotsList = async () => {
  //   const SpotsList = await getSpots();
  //   setSpots(SpotsList)
  // };

  // 반응형 안할꺼면 다 xs값에 md값 넣어주면 됨
  return (
    <div>
      <SpeedDialComponent actions={actions} />

      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WhiteBox
              cpn={<StaffPickFilter getFilter={getFilter} filter={filter} />}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <WhiteBox cpn={<MapApi spots={spots} />} />
          </Grid>

          {/* <Box
            component={Grid}
            item
            md={4}
            display={{ xs: 'none', md: 'block' }}
          >
            <WhiteBox cpn={<StaffPickRank />} />
          </Box> */}
          {/* <Grid item xs={12} md={8}> */}
          <Grid item xs={12} md={12}>
            {spotReviews.length > 0 && (
              <WhiteBox
                cpn={
                  <StaffPickReviews
                    spotReviews={spotReviews}
                    selectedSpot={selectedSpot}
                    deleteSelected={deleteSelected}
                  />
                }
              />
            )}
            {spotReviews.length === 0 && (
              <WhiteBox cpn={<StaffPickSpotList selectSpot={selectSpot} />} />
            )}
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}