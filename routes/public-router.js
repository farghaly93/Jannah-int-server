const router = require("express").Router();
const publicController = require("../controls/public-control.js");
const adminGuard = require("../admin_auth");

router.get("/addVisit", publicController.addVisit);
router.get("/getVisits", publicController.getVisits);
router.get("/getSystemsForAdmin", publicController.getSystemsForAdmin);
router.get("/getSystemData/:id", publicController.getSystemData);
router.get("/getCategories", publicController.getCategories);
router.get("/getSiteData", publicController.getSiteData);
router.post("/login", publicController.login);
router.get("/resetPassword/:email", publicController.resetPassword);


router.post("/editAdminData", adminGuard, publicController.editAdminData);
router.post("/addSystem", adminGuard, publicController.addSystem);
router.get("/getAdminEmail/:userId", adminGuard, publicController.getAdminEmail);
router.post("/editSystem/:id", adminGuard, publicController.editSystem);
router.delete("/removeSystem/:id", adminGuard, publicController.removeSystem);
router.post("/addCategory", adminGuard, publicController.addCategory);
router.delete("/removeCategory/:id", adminGuard, publicController.removeCategory);
router.patch("/updateSiteData", adminGuard, publicController.updateSiteData);
router.get("/getSiteDataForAdmin", adminGuard, publicController.getSiteDataForAdmin);

module.exports = router;