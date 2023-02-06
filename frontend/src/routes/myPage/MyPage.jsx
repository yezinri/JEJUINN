import { Box, Grid, styled, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Profile from '../../components/myPage/Profile';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: '#FF7600',
  width: '100%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    border: '1px solid #FF7600',
    backgroundColor: '#FFFFFF',
  },
});

export default function MyPage({ content }) {
  const comp = content;

  const navigate = useNavigate();
  const onApply = () => {
    navigate('/mypage/resume');
  };
  const onGuestHouse = () => {
    navigate('/mypage/guesthouse');
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <WhiteBox cpn={<Profile />} />
          <CustomButton
            onClick={onApply}
            sx={{
              marginBottom: '8px',
              marginTop: '16px',
            }}
          >
            지원서 관리
          </CustomButton>

          <CustomButton onClick={onGuestHouse}>게스트하우스 관리</CustomButton>
        </Grid>
        <Grid item md={8}>
          <WhiteBox cpn={comp} />
        </Grid>
      </Grid>
    </Box>
  );
}