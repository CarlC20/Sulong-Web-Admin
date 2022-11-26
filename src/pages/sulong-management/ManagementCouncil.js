// @mui
import { Container, Box, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _sulongCards } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import { CouncilChart } from '../../sections/@sulong-dashboard/management/council';

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Council Chart">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4">Council Chart</Typography>
        <br />
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {_sulongCards.map((user) => (
            <CouncilChart key={user.id} user={user} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
