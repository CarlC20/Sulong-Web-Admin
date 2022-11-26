// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// sections
import { AboutDescription, AboutMission, AboutVision } from '../../sections/@sulong-dashboard/management/about';

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();

  return (
    <Page title="About">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AboutDescription />
          </Grid>

          <Grid item xs={12} md={6}>
            <AboutMission />
          </Grid>

          <Grid item xs={12} md={6}>
            <AboutVision />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
