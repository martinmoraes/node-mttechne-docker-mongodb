const { Validator } = require('node-input-validator');
const { consolidate } = require('./common.service');

const getConsolidatedTransactions = async (httpResponse, transactionRepository, until) => {
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
    const consolidated = consolidate(transactionsJson);
    return httpResponse.ok(consolidated);
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
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

module.exports = { getConsolidatedTransactions };
