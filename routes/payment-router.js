const router = require("express").Router();
const paymentController = require("../controls/payment-control.js");

router.post("/charge", paymentController.charge);
router.get("/retrieveCharge/:id", paymentController.retrieveCharge);
router.get("/deleteTransaction/:id", paymentController.deleteTransaction);

module.exports = router;