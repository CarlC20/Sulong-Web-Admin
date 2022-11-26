import mock from './mock';
import { randomInArray } from './funcs';

export const reports = [...Array(5)].map((_, index) => ({
  id: mock.id(index),
  name: mock.name.fullName(index),
  avatar: mock.image.avatar(index),
  date: mock.time(index),
  email: mock.email(index),
  type: mock.reportType(index),
  description: mock.reportDescription(index),
  status: randomInArray(['pending', 'completed']),
}));
