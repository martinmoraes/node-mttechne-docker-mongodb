const { createTransaction } = require('./create_transaction.service');
const { getTransactions } = require('./get_transactions.service');
const { getConsolidatedTransactions } = require('./get_consolidated_transactions.service');
const { getDailyConsolidatedTransactions } = require('./get_daily_consolidated_transactions.service');
const { getDailyTransactedTransactions } = require('./get_daily_transacted_transactions.service');
const { getConsolidatedOnDayTransactions } = require('./get_consolidated_on_day_transactions.service');
const { HttpResponse } = require('../http_response');
const { TransactionRepository } = require('./transaction.repository');

const registerRoutes = (app) => {
  app.post('/transaction', async (req, res) => {
    const transactionDTO = req.body;
    return createTransaction(new HttpResponse(res), new TransactionRepository(), transactionDTO);
  });

  app.get('/transaction', async (req, res) => {
    return getTransactions(new HttpResponse(res), new TransactionRepository());
  });

  app.get('/transaction/consolidated/until/:until?', async (req, res) => {
    return getConsolidatedTransactions(new HttpResponse(res), new TransactionRepository(), req.params.until);
  });

  app.get('/transaction/consolidated/daily/until/:until?', async (req, res) => {
    return getDailyConsolidatedTransactions(
      new HttpResponse(res),
      new TransactionRepository(),
      req.params.until,
    );
  });

  app.get('/transaction/transacted/daily/until/:until?', async (req, res) => {
    return getDailyTransactedTransactions(
      new HttpResponse(res),
      new TransactionRepository(),
      req.params.until,
    );
  });

  app.get('/transaction/transacted/on-day/:day?', async (req, res) => {
    return getConsolidatedOnDayTransactions(
      new HttpResponse(res),
      new TransactionRepository(),
      req.params.day,
    );
  });
};

module.exports = { registerRoutes };
