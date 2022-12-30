// @mui
import { Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
// hooks
import { typeCollector } from '../../utils/marvsutils';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import ReportDetails from '../../sections/@sulong-dashboard/dashboard/report/ReportDetails';
import { ReportType, ReportRatio } from '../../sections/@sulong-dashboard/dashboard/report';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

export default function IncidentReportInformation() {
  const REPORTLABEL = ['Fire', 'Theft', 'Missing Person', 'Riot', 'Missing Pet', 'Others'];

  const { themeStretch } = useSettings();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const postload = async () => {
      const accessToken = localStorage.getItem('accessToken');
      load();
    };
    postload();
  }, []);

  const load = async () => {
    const response = await axios.get('/api/reports', {
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
    <Page title="Incident Report: Information">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Incident Report Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Incident Report', href: PATH_DASHBOARD.incidentReports.root },
            { name: 'Information' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ReportType chartData={typeCollector(REPORTLABEL, reports)} labels={REPORTLABEL} />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReportRatio reports={reports} />
          </Grid>

          <Grid item xs={12}>
            <ReportDetails reports={reports} setReports={setReports} load={load} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
