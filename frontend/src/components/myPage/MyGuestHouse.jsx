import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { deepOrange, grey } from '@mui/material/colors';
import MyGuestHouseInfo from './MyGuestHouseInfo';
import { myGuestHouseList } from '../../api/guestHouse';

const Tab = styled(TabUnstyled)`
  font-family: SUIT-Regular, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  padding: 18px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: inline-flex;
  justify-content: center;

  &:hover {
    background-color: ${deepOrange[300]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${deepOrange[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: #ff7600;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  font-family: SUIT-Regular, sans-serif;
  font-size: 1rem;
  padding: 25px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
`,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  background-color: #FF7600 ;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  align-content: flex-start;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[200]
  };
  `,
);

export default function MyGuestHouse() {
  const access_token = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);
  // const [myGuestHouses, setMyGuestHouses] = useState([]);

  // async function getMyGuestHouse() {
  //   const data = await myGuestHouseList(access_token, userInfo.uid);
  //   console.log(data.data);
  //   setMyGuestHouses(data.data);
  // }

  const myGuestHouses = [
    {
      uid: '1',
      gusetHouseName: '게토게스트하우스',
    },
    {
      uid: '2',
      gusetHouseName: '간장남게스트하우스',
    },
  ];

  // useEffect(() => {
  //   getMyGuestHouse();
  // }, []);

  return (
    <>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ fontSize: '1.8rem' }}>게스트하우스 관리</h1>
          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <SettingsIcon color="warning" />
              <p style={{ paddingLeft: '5px' }}>설정</p>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '1.3rem' }}>내 게스트하우스</p>
            <Link
              to="/guesthouse/create"
              style={{ textDecoration: 'none', color: '#FF7600' }}
            >
              + 새로운 게스트하우스
            </Link>
          </Box>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              {myGuestHouses.map((myGuestHouse) => {
                return <Tab key={uuidv4()}>{myGuestHouse.gusetHouseName}</Tab>;
              })}
            </TabsList>
            {myGuestHouses.map((myGuestHouse, index) => {
              return (
                <TabPanel key={uuidv4()} value={index}>
                  <MyGuestHouseInfo guestHouseUid={myGuestHouse.uid} />
                </TabPanel>
              );
            })}
          </TabsUnstyled>
        </Box>
        <br />
      </Box>
    </>
  );
}
