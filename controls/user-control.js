
const Transactions = require("../models/transactions");



exports.addTransaction = async(req, res) => {
    try {
        const transactions = await new Transactions(req.body).save();
        if(transactions > 0) 
            res.json({added: true})
        else 
            res.json({added: false})
    } catch(err) {
        console.log(err);
        res.json({added: false, error: err});
    }
}

exports.getTransactions = async(req, res) => {
    try {
        const transactions = await Transactions.find();
        res.json({transactions});
    } catch(err) {
        res.json({err});
    }
}