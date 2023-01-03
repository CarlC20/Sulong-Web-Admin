import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { user } = useAuth();
  // console.log('sidebar', user);
  const [data, setData] = useState(null);
  useEffect(async () => {
    if (user) {
      // console.log(user);
      setData(user);
    } else {
      const response = await axios.get('/api/users/myProfile', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      if (response) {
        setData(response.data);
      }
    }
  }, []);
  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {data?.first_name || ''} {data?.last_name || ''}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {data?.role.role_name || ''}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
