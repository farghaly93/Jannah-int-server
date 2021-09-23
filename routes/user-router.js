const router = require("express").Router();
const userController = require("../controls/user-control.js");

router.post("/addTransaction", userController.addTransaction);
router.get("/getTransactions", userController.getTransactions);

module.exports = router;