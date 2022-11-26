import { sub } from 'date-fns';

import { email } from './email';
import { phoneNumber } from './phoneNumber';
import { firstName, lastName, fullName } from './name';
import { requestDescription, items, quantity } from './requestDetails';
import { events, facility, reservationDescription } from './reservationDetails';
import { reportType, reportDescription } from './reportDetails';
import { address, country, city } from './address';

const mock = {
  id: (index) => index + 1,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  requestDescription: (index) => requestDescription[index],
  items: (index) => items[index],
  quantity: (index) => quantity[index],
  events: (index) => events[index],
  facility: (index) => facility[index],
  reservationDescription: (index) => reservationDescription[index],
  reportType: (index) => reportType[index],
  reportDescription: (index) => reportDescription[index],
  address: (index) => address[index],
  country: (index) => country[index],
  city: (index) => city[index],
  image: {
    cover: (index) => `https://minimal-assets-api.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    avatar: (index) => `https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
};

export default mock;
