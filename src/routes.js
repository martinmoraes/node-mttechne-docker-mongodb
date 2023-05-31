const { registerRoutes: transactionRegisterRoutes } = require('./api/transaction/transaction.controller');

const setupRoutes = (app) => {
  transactionRegisterRoutes(app);
};

module.exports = { setupRoutes };
