require('dotenv').config();
const { createTransaction } = require('../../../src/api/transaction/create_transaction.service');
const { Operation } = require('../../../src/api/transaction/operation.enum');
const { HttpResponseMock } = require('../mock/http_reponse.mock');
const { TransactionRepositoryMock } = require('../mock/transaction.repository.mock');

describe('Transaction Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create transaction', () => {
    it('create transaction success', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        value: 1.5,
        description: 'my description',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      const actualParameters = HttpResponseMock.ok.mock.calls[0][0];
      expect(actualParameters).toEqual(expect.objectContaining(transactionDtoMock));
      expect(actualParameters._id.toString().length).toEqual(24);
    });

    it('create transaction with invalid operation', async () => {
      const transactionDtoMock = {
        operation: 'xxxxx',
        value: 1.5,
        description: 'my description',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];
      expect(actualParameters).toEqual(
        expect.objectContaining({
          operation: [
            {
              message: 'The operation format is invalid.',
              rule: 'regex',
            },
          ],
        }),
      );
    });

    it('create transaction with invalid value', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        value: 'xxxx',
        description: 'my description',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          value: [
            {
              message: 'The value must be a valid decimal value.',
              rule: 'decimal',
            },
          ],
        }),
      );
    });

    it('create transaction without value', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        description: 'my description',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          value: [
            {
              message: 'The value field is mandatory.',
              rule: 'required',
            },
            {
              message: 'The value must be a valid decimal value.',
              rule: 'decimal',
            },
          ],
        }),
      );
    });

    it('create transaction without description', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        value: 1.5,
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          description: [
            {
              message: 'The description field is mandatory.',
              rule: 'required',
            },
          ],
        }),
      );
    });

    it('create transaction with description greater than 80 characters', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        value: 1.5,
        description:
          'qieuroiqwu rpouqieropquw ropiquw roqwiur opquropquwrp qoiurpoqur oqpurpoqiuropiqwur qpowirupoqwurpqowur ',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          description: [
            {
              message: 'The description can not be greater than 80.',
              rule: 'maxLength',
            },
          ],
        }),
      );
    });

    it('create transaction with invalid key', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        value: 1.5,
        description: 'qieuroiqwu',
        key_additional: 'xxxxx',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          key_additional: [
            {
              message: 'This attribute is not allowed for creating a transaction',
              rule: 'invalid_attribute',
            },
          ],
        }),
      );
    });

    it('create transaction with invalid key and without value', async () => {
      const transactionDtoMock = {
        operation: Operation.CREDIT,
        description: 'qieuroiqwu',
        key_additional: 'xxxxx',
      };

      const result = await createTransaction(
        HttpResponseMock,
        new TransactionRepositoryMock(),
        transactionDtoMock,
      );

      expect(result.statusCode).toEqual(403);
      const actualParameters = HttpResponseMock.invalidFormat.mock.calls[0][0];

      expect(actualParameters).toEqual(
        expect.objectContaining({
          value: [
            { message: 'The value field is mandatory.', rule: 'required' },
            {
              message: 'The value must be a valid decimal value.',
              rule: 'decimal',
            },
          ],
          key_additional: [
            {
              message: 'This attribute is not allowed for creating a transaction',
              rule: 'invalid_attribute',
            },
          ],
        }),
      );
    });
  });

  it('excessão gerada por create', async () => {
    const transactionRepositoryMock = new TransactionRepositoryMock();
    const spyTransactionRepositoryMock = jest
      .spyOn(transactionRepositoryMock, 'create')
      .mockImplementation(() => {
        throw new Error('Exceção gerada pelo mock');
      });

    const transactionDtoMock = {
      operation: Operation.CREDIT,
      value: 1.5,
      description: 'my description',
    };

    const result = await createTransaction(HttpResponseMock, transactionRepositoryMock, transactionDtoMock);

    const actualParameters = HttpResponseMock.internalError.mock.calls[0][0];
    expect(actualParameters).toEqual('Exceção gerada pelo mock');
    expect(result.statusCode).toEqual(500);

    expect(spyTransactionRepositoryMock).toHaveBeenCalled();
    expect(spyTransactionRepositoryMock).toThrow();
  });
});
