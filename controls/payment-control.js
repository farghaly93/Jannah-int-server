const siteData = require("../models/site-data");
const Transactions = require("../models/transactions");



exports.charge = async(req, res) => {
    try {
        const data = req.body;
        var newCharge = {
            amount: data.amount,
            currency: "usd",
            source: data.token_from_stripe, // obtained with Stripe.js on the client side
            receipt_email: data.email,
            shipping: {
                name: data.name,
                address: {
                    line1: data.address?.street,
                    city: data.address?.city,
                    state: data.address?.state,
                    postal_code: data.address?.zip,
                    country: data.country
                }
            }
        };
        // sk_test_51Ja4BCJ1ChIdrBADlTHbINfWiHXa6JxRRMo7l7gzaCHc0yZ1SX9o3RUO5mGnFNK8Ajmg0NRF7gmyX5a0bW2hV3UJ00pxMaPhjl"
        
        // Call the stripe objects helper functions to trigger a new charge
        const sitData = await siteData.find().limit(1);
        const stripe_secret_key = sitData[0].stripe_secret_key;
        const stripe = require('stripe')(stripe_secret_key);
        // console.log(stripe);
        // return
        stripe.charges.create(newCharge, async function(err, charge) {
            if (err){
                console.error(err);
                res.json({ added: false, error: err, charge: false });
            } else {
                const transactions = await new Transactions({...data, chargeId: charge.id}).save();
                if(transactions) 
                    res.json({added: true, charge})
                else 
                    res.json({added: false})
            }
        });
    } catch(err) {
        console.log(err);
        res.json({added: false, error: err});
    }
}




exports.retrieveCharge = async(req, res) => {
    try {
        const sitData = await siteData.find().limit(1);
        const stripe_secret_key = sitData[0].stripe_secret_key;
        const stripe = require('stripe')(stripe_secret_key);
        stripe.charges.retrieve(req.params.id, function(err, charge) {
            if (err){
                res.json({ error: err, charge: false });
            } else {
                res.json({ error: false, charge: charge });
            }
        });
    } catch(err) {
        res.json({err});
    }
}

exports.deleteTransaction = async(req, res) => {
    const del = await Transactions.deleteOne({_id: req.params.id});
    if(del.acknowledged) {
        res.json({done: true});
    } else {
        res.json({done: false})
    }
}