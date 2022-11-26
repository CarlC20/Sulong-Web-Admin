// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ReservationDetails,
  ReservationType,
  ReservationRatio,
} from '../../sections/@sulong-dashboard/dashboard/reservation';

// ----------------------------------------------------------------------

export default function RequestInquiry() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Reservations: Information">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Reservations Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Reservations', href: PATH_DASHBOARD.reservations.root },
            { name: 'Information' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ReservationType />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReservationRatio />
          </Grid>

          <Grid item xs={12}>
            <ReservationDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
