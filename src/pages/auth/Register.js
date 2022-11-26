import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { RegisterForm } from '../../sections/auth/register';

import { AuthPage } from '../../assets';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  display: 'flex',
  maxHeight: 700,
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <Page
      title="Register"
      sx={{
        backgroundImage: `url(${AuthPage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
      }}
    >
      <RootStyle>
        <Container sx={{ pt: 20 }}>
          <ContentStyle sx={{ p: 5, backgroundColor: '#161c24', borderRadius: 5 }}>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Register to Sulong as an Admin
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Start managing your community today.</Typography>
              </Box>
            </Box>

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, you agree to our&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>
            <br />

            <Typography variant="body2" align="center" sx={{ mt: { md: -2 }, color: 'text.secondary' }}>
              Want to go back?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_DASHBOARD.users.userList}>
                Click here
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
