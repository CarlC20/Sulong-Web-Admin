// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ReportDetails, ReportType, ReportRatio } from '../../sections/@sulong-dashboard/dashboard/report';

// ----------------------------------------------------------------------

export default function IncidentReportInformation() {
  const { themeStretch } = useSettings();

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
            <ReportType />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReportRatio />
          </Grid>

          <Grid item xs={12}>
            <ReportDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
