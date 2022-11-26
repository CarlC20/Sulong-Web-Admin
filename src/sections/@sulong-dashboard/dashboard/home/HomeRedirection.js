// import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Stack, Button } from '@mui/material';

import Image from '../../../../components/Image';
import { Request, Reservation, Report } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  textColor: 'fff',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// const requestTotal = () => {};
// const reservationTotal = () => {};
// const reportTotal = () => {};

// ----------------------------------------------------------------------

// HomeRedirection.propTypes = {
//   displayName: PropTypes.string,
// };

export default function HomeRedirection() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 2 },
          pl: { md: 5 },
        }}
      >
        <Typography variant="h4" sx={{ pb: 2 }}>
          Upcoming tasks
        </Typography>
        <Stack direction="row" spacing={11}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ pb: 2 }}>
              {/* placeholder of number of request */} 7 new Requests & Inquiries
            </Typography>
            <Image src={Request} atl="RequestImage" sx={{ width: 100, height: 100, objectFit: 'cover' }} />
            <Button href={'/dashboard/requests-&-inquiries/request-&-inquiry'} variant="contained" sx={{ mt: 2 }}>
              Go to Request & Inquiry
            </Button>
          </Stack>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ pb: 2 }}>
              {/* placeholder of number of request */} 3 new Reservations
            </Typography>
            <Image src={Reservation} atl="RequestImage" sx={{ width: 100, height: 100, objectFit: 'cover' }} />
            <Button href={'/dashboard/reservations/reservation'} variant="contained" sx={{ mt: 2 }}>
              Go to Reservation
            </Button>
          </Stack>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ pb: 2 }}>
              {/* placeholder of number of request */} 6 new Incident Reports
            </Typography>
            <Image src={Report} atl="RequestImage" sx={{ width: 100, height: 100, objectFit: 'cover' }} />
            <Button href={'/dashboard/incident-reports/incident-report'} variant="contained" sx={{ mt: 2 }}>
              Go to Incident Report
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </RootStyle>
  );
}
