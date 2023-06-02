const { Validator } = require('node-input-validator');
const { consolidate } = require('./common.service');

const getTransactedOnDayTransactions = async (httpResponse, transactionRepository, day) => {
  try {
    const validationErrors = await validate({ day });

    if (validationErrors) {
      return httpResponse.invalidFormat(validationErrors);
    }

    const untilDate = new Date(day);
    const transactionModels = await transactionRepository.findOnDay(untilDate);

    const transactionsJson = transactionModels.map((transactionModel) => transactionModel.toJSON());
    const consolidated = consolidate(transactionsJson);
    return httpResponse.ok(consolidated);
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
};

const validate = async (payload) => {
  if (!payload.day) {
    return {
      day: [
        {
          message: 'The date is required.',
          rule: 'date',
        },
      ],
    };
  }

  Validator.bailable(false);

  const validation = new Validator(payload, {
    day: 'date',
  });

  if (await validation.fails()) {
    return validation.errors;
  }
};

module.exports = { getTransactedOnDayTransactions };
