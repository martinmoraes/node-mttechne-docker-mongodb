const { Validator } = require('node-input-validator');
const { consolidate } = require('./common.service');

const getDailyConsolidatedTransactions = async (httpResponse, transactionRepository, until) => {
  try {
    if (until) {
      const validationErrors = await validate({ until });
      if (validationErrors) {
        return httpResponse.invalidFormat(validationErrors);
      }
    }

    const untilDate = until ? new Date(until) : undefined;
    const transactionModels = await transactionRepository.findUntil(untilDate);
    const transactionsJson = transactionModels.map((transactionModel) => transactionModel.toJSON());
    const consolidated = consolidateDaily(transactionsJson);
    return httpResponse.ok(consolidated);
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
};

const consolidateDaily = (transactions) => {
  const dailyTransactions = transactions.reduce((accumulated, current) => {
    const day = current.createdAt.toISOString().substring(0, 10);
    if (!accumulated[day]) {
      accumulated[day] = [];
    }
    accumulated[day].push(current);
    return accumulated;
  }, {});

  const dailyConsolidatedTransactions = {};
  let previousDayConsolidatedTotal;
  for (const day in dailyTransactions) {
    dailyConsolidatedTransactions[day] = consolidate(dailyTransactions[day]);

    if (previousDayConsolidatedTotal) {
      dailyConsolidatedTransactions[day].total += previousDayConsolidatedTotal;
    }

    previousDayConsolidatedTotal = dailyConsolidatedTransactions[day].total;
  }

  return dailyConsolidatedTransactions;
};

const validate = async (payload) => {
  Validator.bailable(false);

  const validation = new Validator(payload, {
    until: 'dateiso',
  });

  if (await validation.fails()) {
    return validation.errors;
  }
};

module.exports = { getDailyConsolidatedTransactions };
