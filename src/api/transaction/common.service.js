const { Operation } = require('./operation.enum');
const Decimal = require('decimal.js');

const consolidate = (transactions) => {
  const consolidated = transactions.reduce(
    (accumulated, current) => {
      if (current.operation === Operation.CREDIT) {
        accumulated.credit = accumulated.credit.plus(current.value);
        accumulated.total = accumulated.total.plus(current.value);
      }

      if (current.operation === Operation.DEBIT) {
        accumulated.debit = accumulated.debit.plus(current.value);
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
