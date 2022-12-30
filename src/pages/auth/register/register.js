import { setSession } from '../../../utils/jwt';
import axios from '../../../utils/axios';

export const createAdmin = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    setSession(accessToken);

    const res = await axios.post(`/api/users/create-admin`, payload, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    console.log(res);

    return res;
  } catch (error) {
    //
  }
};
