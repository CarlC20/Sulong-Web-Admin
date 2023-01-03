import { setSession } from '../../../utils/jwt';
import axios from '../../../utils/axios';

export const UpdateUser = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    setSession(accessToken);

    const myProfile = await await axios.get('/api/users/myProfile', {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    const id = myProfile.data.id;

    const res = await axios.put(`api/profile/${id}`, payload, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
  } catch (error) {
    //
  }
};

export const UpdatePassword = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    setSession(accessToken);

    const myProfile = await await axios.get('/api/users/myProfile', {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    const id = myProfile.data.id;

    const res = await axios.put(`api/profile/${id}`, payload, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    // console.log(res);
  } catch (error) {
    //
  }
};
