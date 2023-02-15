import { Stack, Typography } from '@mui/material';
import { images } from '../../../assets/images';

export default function MyInterestGuestHouse({ guestHouse }) {
  const getImageUrl = () => {
    return `${images.defalut_url}${guestHouse?.imgUrl}`;
  };

  return (
    <Stack direction="row" sx={{ p: '4%' }} alignItems="center" spacing={7}>
      <img
        src={getImageUrl()}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
        }}
      />
      <Typography variant="h6">{guestHouse?.guestHouseName}</Typography>
    </Stack>
  );
}