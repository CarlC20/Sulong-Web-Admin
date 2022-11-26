import { setSession } from '../../../utils/jwt';
import axios from '../../../utils/axios';

export const AddAnnouncement = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    setSession(accessToken);

    const res = await axios.post(`/api/announcements/create-announcement/1`, payload, {
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
