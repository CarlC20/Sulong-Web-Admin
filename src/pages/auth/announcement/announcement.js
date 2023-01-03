import { setSession } from '../../../utils/jwt';
import axios from '../../../utils/axios';

export const AddAnnouncement = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    setSession(accessToken);

    const myProfile = await await axios.get('/api/users/myProfile', {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    const id = myProfile.data.id;
    // console.log('====================================');
    // console.log(myProfile);
    // console.log('====================================');

    const res = await axios.post(`/api/announcements/create-announcement/${id}`, payload, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    return res;
  } catch (error) {
    //
  }
};
// export const EditAnnouncement = async (payload, id) => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     setSession(accessToken);
//     const res = await axios.put(`/api/announcement/${id}`, payload, {
//       headers: {
//         'x-api-key': process.env.REACT_APP_API_KEY,
//       },
//     });
//     return res;
//   } catch (error) {
//     //
//   }
// };
export const DeleteAnnouncement = async (id) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    setSession(accessToken);

    const res = await axios.delete(`/api/announcements/delete/${id}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    return res;
  } catch (error) {
    //
  }
};
