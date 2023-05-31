const { Operation } = require('./operation.enum');
const Decimal = require('decimal.js');

const consolidate = (transactions) => {
  const consolidated = transactions.reduce(
    (accumulated, current) => {
      accumulated.credit = accumulated.credit.plus(
        current.operation === Operation.CREDIT ? current.value : 0,
      );
      accumulated.debit = accumulated.debit.plus(current.operation === Operation.DEBIT ? current.value : 0);

      if (current.operation === Operation.CREDIT) {
        accumulated.total = accumulated.total.plus(current.value);
      }

      if (current.operation === Operation.DEBIT) {
        accumulated.total = accumulated.total.minus(current.value);
      }

      return accumulated;
    },
    { credit: new Decimal(0), debit: new Decimal(0), total: new Decimal(0) },
  );

  consolidated.credit = parseFloat(consolidated.credit);
  consolidated.debit = parseFloat(consolidated.debit);
  consolidated.total = parseFloat(consolidated.total);

  return consolidated;
};

module.exports = { consolidate };
