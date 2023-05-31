const { Validator } = require('node-input-validator');
const { consolidate } = require('./common.service');

const getDailyTransactedTransactions = async (httpResponse, transactionRepository, until) => {
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
    const consolidated = consolidateTransactedDaily(transactionsJson);
    return httpResponse.ok(consolidated);
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
};

const consolidateTransactedDaily = (transactions) => {
  const dailyTransactions = transactions.reduce((accumulated, current) => {
    const day = current.createdAt.toISOString().substring(0, 10);
    if (!accumulated[day]) {
      accumulated[day] = [];
    }
    accumulated[day].push(current);
    return accumulated;
  }, {});

  const dailyConsolidatedTransactions = {};
  for (const day in dailyTransactions) {
    dailyConsolidatedTransactions[day] = consolidate(dailyTransactions[day]);
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

module.exports = { getDailyTransactedTransactions };
