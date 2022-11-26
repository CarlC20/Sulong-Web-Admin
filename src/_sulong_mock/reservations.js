import mock from './mock';
import { randomInArray } from './funcs';

export const reservations = [...Array(5)].map((_, index) => ({
  id: mock.id(index),
  name: mock.name.fullName(index),
  avatar: mock.image.avatar(index),
  date: mock.time(index),
  email: mock.email(index),
  event: mock.events(index),
  facility: mock.facility(index),
  description: mock.reservationDescription(index),
  status: randomInArray(['pending', 'completed']),
}));
