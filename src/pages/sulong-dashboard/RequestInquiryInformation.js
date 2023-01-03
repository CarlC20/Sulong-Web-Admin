// @mui
import { Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { RequestDetails, RequestType, RequestRatio } from '../../sections/@sulong-dashboard/dashboard/request';
import axios from '../../utils/axios';
import { typeCollector } from '../../utils/marvsutils';

// ----------------------------------------------------------------------

export default function RequestInquiry() {
  const REQUESTLABEL = [
    'Barangay Clearance',
    'Barangay Id',
    'Business Permit',
    'Travel Pass',
    'Health Certificate',
    'Others',
  ];

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
    const response = await axios.get('/api/requests', {
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
          <Grid item xs={12}>
            <RequestDetails load={load} requests={reports} setRequests={setReports} />
          </Grid>

          <Grid item xs={12} md={6}>
            <RequestType chartData={typeCollector(REQUESTLABEL, reports)} labels={REQUESTLABEL} />
          </Grid>

          <Grid item xs={12} md={6}>
            <RequestRatio requests={reports} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
