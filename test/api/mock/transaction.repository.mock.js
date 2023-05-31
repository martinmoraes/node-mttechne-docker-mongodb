const { Operation } = require('../../../src/api/transaction/operation.enum');
const { TransactionModel } = require('../../../src/api/transaction/transaction.model');

class TransactionRepositoryMock {
  transactionsModels = [
    new TransactionModel({
      operation: Operation.CREDIT,
      value: 100.2,
      description: 'my description',
      createdAt: '2023-05-20T22:55:11.444Z',
      updatedAt: '2023-05-30T22:55:11.444Z',
    }),
    new TransactionModel({
      operation: Operation.DEBIT,
      value: 50.2,
      description: 'my description',
      createdAt: '2023-05-20T22:55:11.444Z',
      updatedAt: '2023-05-30T22:55:11.444Z',
    }),
    new TransactionModel({
      operation: Operation.CREDIT,
      value: 200.2,
      description: 'my description',
      createdAt: '2023-05-10T22:55:11.444Z',
      updatedAt: '2023-05-10T22:55:11.444Z',
    }),
    new TransactionModel({
      operation: Operation.DEBIT,
      value: 100.2,
      description: 'my description',
      createdAt: '2023-05-10T22:55:11.444Z',
      updatedAt: '2023-05-10T22:55:11.444Z',
    }),
  ];

  async create(dto) {
    return new TransactionModel(dto);
  }

  async findOnDay(untilDate) {
    return this.transactionsModels;
  }
  async findUntil() {
    return this.transactionsModels;
  }
  async findAll() {
    return this.transactionsModels;
  }
}

module.exports = { TransactionRepositoryMock };
