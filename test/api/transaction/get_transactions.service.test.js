require('dotenv').config();
const { getTransactions } = require('../../../src/api/transaction/get_transactions.service');
const { HttpResponseMock } = require('../mock/http_reponse.mock');
const { TransactionRepositoryMock } = require('../mock/transaction.repository.mock');

describe('Get Transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getting the transactions', () => {
    it('success in getting the transactions', async () => {
      const result = await getTransactions(HttpResponseMock, new TransactionRepositoryMock());

      expect(result.statusCode).toEqual(200);
      const actualParameters = HttpResponseMock.ok.mock.calls[0][0];
      expect(actualParameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            description: expect.any(String),
            operation: expect.any(String),
            updatedAt: expect.any(Date),
            value: expect.any(Number),
          }),
        ]),
      );
    });
  });

  describe('exception generated', () => {
    it('exception generated by findAll', async () => {
      const transactionRepositoryMock = new TransactionRepositoryMock();
      const spyTransactionRepository = jest
        .spyOn(transactionRepositoryMock, 'findAll')
        .mockImplementation(() => {
          throw new Error('Exceção gerada pelo mock');
        });

      const result = await getTransactions(HttpResponseMock, transactionRepositoryMock);
      expect(result.statusCode).toEqual(500);
      const actualParameters = HttpResponseMock.internalError.mock.calls[0][0];
      expect(actualParameters).toEqual('Exceção gerada pelo mock');

      expect(spyTransactionRepository).toHaveBeenCalledWith();
      expect(spyTransactionRepository).toThrow();
    });
  });
});