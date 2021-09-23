const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: Object
  },
  amount: {
    type: Number,
  },
  date: {
    type: Number,
  },
  chargeId: {
    type: String,
  }
});

module.exports = mongoose.model('transactions', transactionSchema);
