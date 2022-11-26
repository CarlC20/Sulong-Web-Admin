// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { RequestInventoryDetails } from '../../sections/@sulong-dashboard/dashboard/request';
// ----------------------------------------------------------------------

export default function RequestInquiryInventory() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Request & Inquiry: Inventory">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Request & Inquiry Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Requests & Inquiries', href: PATH_DASHBOARD.requestsInquiries.root },
            { name: 'Inventory' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <RequestInventoryDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
