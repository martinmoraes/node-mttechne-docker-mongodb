const { consolidate } = require('../../../src/api/transaction/common.service');
const { dailyTransactionsMock } = require('../mock/daily_transactions.mock');

describe('Validate consolidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validate day', () => {
    it('validates consolidation success', async () => {
      const result = await consolidate(dailyTransactionsMock);

      expect(result).toEqual({ credit: 120.2, debit: 80.2, total: 40 });
    });
  });
});
