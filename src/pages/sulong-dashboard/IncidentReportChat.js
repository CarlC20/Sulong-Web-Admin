import { useEffect } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ReportChatSidebar, ReportChatWindow } from '../../sections/@sulong-dashboard/dashboard/report';

// ----------------------------------------------------------------------

export default function IncidentReportChat() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Incident Report: Information">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Incident Report Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Incident Report', href: PATH_DASHBOARD.incidentReports.root },
            { name: 'Chat' },
          ]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ReportChatSidebar />
          <ReportChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
