const getTransactions = async (httpResponse, transactionRepository) => {
  try {
    const transactionModels = await transactionRepository.findAll();
    const transactionsJson = transactionModels.map((transactionModel) => transactionModel.toJSON());
    return httpResponse.ok(transactionsJson);
  } catch (err) {
    return httpResponse.internalError(err.message, err);
  }
};
module.exports = { getTransactions };
