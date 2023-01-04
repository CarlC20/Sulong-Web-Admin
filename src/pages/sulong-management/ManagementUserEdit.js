import { useState, useEffect } from 'react';

import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import { setSession } from '../../utils/jwt';
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { UserEditForm } from '../../sections/@sulong-dashboard/management/user';

// ----------------------------------------------------------------------

export default function ManagementUserEdit() {
  const accessToken = localStorage.getItem('accessToken');
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');

  const [data, setData] = useState([]);

  // const currentUser = _userList.find((user) => paramCase(user.name) === name);

  useEffect(async () => {
    try {
      setSession(accessToken);

      const res = await axios.get(`/api/users/${name}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      // console.log(res.data.id);
      setData(res.data);
    } catch (error) {
      //
    }
  }, []);

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'User', href: PATH_DASHBOARD.users.userList },
            // { name: !isEdit ? 'New user' : capitalCase(name) },
            { name: `${data.first_name} ${data.last_name}` },
          ]}
        />

        <UserEditForm isEdit={isEdit} currentUser={data} />
      </Container>
    </Page>
  );
}
