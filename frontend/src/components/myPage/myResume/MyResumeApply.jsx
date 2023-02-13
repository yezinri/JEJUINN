import {
  FormControlLabel,
  Button,
  Switch,
  Popover,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React from 'react';
import WorkHistory from '../WorkHistory';
import { changeAutoApply } from '../../../api/resume';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';

// resume.autoApply

export default function MyResumeApply({ resume, changeApplyComp }) {
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);

  const [anchorEl, setAnchorEl] = useState(false);
  const [historyList, setHistoryList] = useState([
    {
      uid: 1,
      guestHouseName: '가토 게스트하우스',
      startDate: '22-01-22',
      endDate: '23-4-14',
    },
    {
      uid: 15,
      guestHouseName: '정민 게스트하우스',
      startDate: '22-01-22',
      endDate: '23-4-14',
    },
  ]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChangeAutoApply = async () => {
    await changeAutoApply(accessToken, userInfo.uid);
    setAnchorEl((prev) => !prev);
  };

  useEffect(() => {
    setAnchorEl(resume.autoApply);
  }, []);

  const open = Boolean(anchorEl);
  return (
    <Stack p="3%" spacing={3}>
      <Stack direction="row" alignItems="center">
        <HelpOutlineOutlinedIcon
          color="primary"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1, width: '300px' }}>
            지원서에 작성한 내용을 바탕으로
            <br /> 적합한 게스트하우스에 자동으로 지원됩니다.
          </Typography>
        </Popover>
        <FormControlLabel
          value="start"
          control={
            <Switch
              color="primary"
              onChange={handleChangeAutoApply}
              checked={anchorEl}
            />
          }
          label="자동추천"
          labelPlacement="start"
        />
        <Button onClick={changeApplyComp}>수정</Button>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography minWidth="100px">선호 스타일</Typography>
        <Stack direction="row" spacing={1}>
          {resume.personTypes.map(({ type }) => {
            return <Chip key={type} label={'#' + type} color="primary" />;
          })}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography minWidth="100px">선호 지역</Typography>
        <Stack direction="row" alignItems="center">
          {resume.interestAreas.map((area) => {
            return (
              <Chip key={area} label={'#' + area.areaName} color="primary" />
            );
          })}
        </Stack>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">입도 가능일</Typography>
        <Typography>{resume.possibleStartDate}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">자기소개</Typography>
        <Typography>{resume.content}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">근무이력</Typography>
        <Stack direction="row" spacing={2}>
          {historyList.map((history) => {
            return <WorkHistory key={history.uid} history={history} />;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}