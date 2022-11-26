import mock from './mock';
import { randomInArray } from './funcs';

export const requests = [...Array(5)].map((_, index) => ({
  id: mock.id(index),
  name: mock.name.fullName(index),
  avatar: mock.image.avatar(index),
  description: mock.requestDescription(index),
  date: mock.time(index),
  email: mock.email(index),
  status: randomInArray(['pending', 'completed']),
}));
