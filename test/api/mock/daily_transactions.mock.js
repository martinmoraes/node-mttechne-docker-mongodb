const { ObjectId } = require('mongodb');

const dailyTransactionsMock = [
  {
    operation: 'CREDIT',
    value: 100.2,
    description: 'my description',
    _id: new ObjectId('6479e42f02dbaea33e2147d5'),
    createdAt: '2023-05-20T22:55:11.444Z',
    updatedAt: '2023-05-30T22:55:11.444Z',
  },
  {
    operation: 'DEBIT',
    value: 50.2,
    description: 'my description',
    _id: new ObjectId('6479e42f02dbaea33e2147d6'),
    createdAt: '2023-05-20T22:55:11.444Z',
    updatedAt: '2023-05-30T22:55:11.444Z',
  },
  {
    operation: 'CREDIT',
    value: 20,
    description: 'my description',
    _id: new ObjectId('6479e42f02dbaea33e2147d5'),
    createdAt: '2023-05-20T22:55:11.444Z',
    updatedAt: '2023-05-30T22:55:11.444Z',
  },
  {
    operation: 'DEBIT',
    value: 30,
    description: 'my description',
    _id: new ObjectId('6479e42f02dbaea33e2147d6'),
    createdAt: '2023-05-20T22:55:11.444Z',
    updatedAt: '2023-05-30T22:55:11.444Z',
  },
];

module.exports = { dailyTransactionsMock };
