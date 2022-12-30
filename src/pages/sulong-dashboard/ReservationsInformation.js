// @mui
import { Grid, Container } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import axios from '../../utils/axios';

// sections
import {
  ReservationDetails,
  ReservationType,
  ReservationRatio,
} from '../../sections/@sulong-dashboard/dashboard/reservation';
import { typeCollector } from '../../utils/marvsutils';

// ----------------------------------------------------------------------

export default function RequestInquiry() {
  const { themeStretch } = useSettings();
  const RESERVATIONLABEL = ['Brgy Gym', 'Brgy Hall', 'Stage', 'Court', 'Clinic', 'Others'];
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const postload = async () => {
      load();
    };
    postload();
  }, []);

  const load = async () => {
    const response = await axios.get('/api/reservations', {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    const sortedAsc = response.data.sort(
      (objA, objB) => Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt))
    );
    setReports(sortedAsc);
  };
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
            <ReservationType chartData={typeCollector(RESERVATIONLABEL, reports)} labels={RESERVATIONLABEL} />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReservationRatio reports={reports} />
          </Grid>

          <Grid item xs={12}>
            <ReservationDetails reservations={reports} load={load} setReservations={setReports} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
