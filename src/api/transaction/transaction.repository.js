const { TransactionModel } = require('./transaction.model');

class TransactionRepository {
  async findAll() {
    return TransactionModel.find({}).sort({ createdAt: 1 });
  }

  async findUntil(until) {
    if (until) {
      return TransactionModel.find({
        createdAt: { $lte: until },
      }).sort({ createdAt: 1 });
    } else {
      return TransactionModel.find({}).sort({ createdAt: 1 });
    }
  }

  async findOnDay(day) {
    const from = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + 1);

    return TransactionModel.find({
      createdAt: {
        $gte: from,
        $lt: to,
      },
    });
  }

  async create(transactionDto) {
    const transactionModel = new TransactionModel(transactionDto);
    return transactionModel.save();
  }
}

module.exports = { TransactionRepository };
