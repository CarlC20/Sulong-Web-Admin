// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { LoginForm } from '../../sections/auth/login';

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

export default function Login() {
  return (
    <Page
      title="Login"
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
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Sulong Admin
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>
            </Stack>

            <Stack>
              <LoginForm />
              {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography> */}
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
