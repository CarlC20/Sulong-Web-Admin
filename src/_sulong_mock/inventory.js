import mock from './mock';

export const inventory = [...Array(3)].map((_, index) => ({
  id: mock.id(index),
  name: mock.items(index),
  quantity: mock.quantity(index),
}));
