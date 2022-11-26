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
import { RequestDetails, RequestType, RequestRatio } from '../../sections/@sulong-dashboard/dashboard/request';

// ----------------------------------------------------------------------

export default function RequestInquiry() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Request & Inquiry: Information">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Request & Inquiry Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Requests & Inquiries', href: PATH_DASHBOARD.requestsInquiries.root },
            { name: 'Information' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RequestType />
          </Grid>

          <Grid item xs={12} md={6}>
            <RequestRatio />
          </Grid>

          <Grid item xs={12}>
            <RequestDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
