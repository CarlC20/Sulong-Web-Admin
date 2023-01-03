import { useEffect, useState } from 'react';
import axios from '../utils/axios';
// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState();

  useEffect(async () => {
    if (user) {
      setUserData(user);
    } else {
      const response = await axios.get('/api/users/myProfile', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      if (response) {
        setUserData(response.data);
      }
    }
  }, [user]);

  return (
    <Avatar
      src={userData?.profile_url}
      alt={userData?.username}
      color={userData?.profile_url ? 'default' : createAvatar(userData?.username).color}
      {...other}
    >
      {createAvatar(userData?.username).name}
    </Avatar>
  );
}
