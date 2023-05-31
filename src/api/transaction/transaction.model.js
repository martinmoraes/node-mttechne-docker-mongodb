const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Operation } = require('./operation.enum');

const transaction = new Schema(
  {
    operation: {
      type: String,
      enum: [Operation.CREDIT, Operation.DEBIT],
    },
    value: Number,
    description: String,
  },
  { timestamps: true },
);

const TransactionModel = mongoose.model('Transaction', transaction);

module.exports = { TransactionModel };
