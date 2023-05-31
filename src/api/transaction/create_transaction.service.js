const { Validator } = require('node-input-validator');

const createTransaction = async (httpResponse, transactionRepository, transactionDto) => {
  try {
    const validationErrors = await validate(transactionDto);
    if (validationErrors) {
      return httpResponse.invalidFormat(validationErrors);
    }

    const transactionModel = await transactionRepository.create(transactionDto);
    return httpResponse.ok(transactionModel.toJSON());
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
};

const validate = async (transactionDto) => {
  Validator.bailable(false);

  const rules = {
    value: 'required|decimal',
    description: 'required|maxLength:80',
    operation: ['required', 'regex:(CREDIT|DEBIT)$'],
  };

  // Making sure only allows attributes are present in the payload
  const invalidKeys = validateInvalidKeys(rules, transactionDto);

  const validation = new Validator(transactionDto, rules);

  if ((await validation.fails()) || invalidKeys) {
    return Object.assign(validation.errors, invalidKeys);
  }
};

const validateInvalidKeys = (rules, transactionDto) => {
  const validationErrorList = Object.keys(transactionDto)
    .map((key) => {
      if (!Object.hasOwn(rules, key)) {
        return {
          [key]: [
            {
              message: 'This attribute is not allowed for creating a transaction',
              rule: 'invalid_attribute',
            },
          ],
        };
      }
    })
    .filter(Boolean);

  if (validationErrorList.length <= 0) {
    return;
  }

  return Object.assign(...validationErrorList);
};

module.exports = { createTransaction };
