// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { AnnouncementNewForm } from '../../sections/@sulong-dashboard/dashboard/announcement';

// ----------------------------------------------------------------------

export default function AnnouncementAddAnnouncement() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Announcements: Add Announcement">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create an announcement"
          links={[
            { name: 'Home', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Announcements', href: PATH_DASHBOARD.announcements.announcement },
            { name: 'Add Announcement' },
          ]}
        />

        <AnnouncementNewForm />
      </Container>
    </Page>
  );
}
