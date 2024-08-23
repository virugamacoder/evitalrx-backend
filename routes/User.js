const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const { authorizeUser } = require("../middleware/Auth");

router.post("/signup", userController.signup);
router.post("/signupsendotp", userController.signupSendOtp);
router.post("/signupverifyotp", userController.signupVerifyotp);

router.post("/login", userController.login);

router.post("/forgotpassword", userController.forgotPassword);

router.post("/resetpassword", userController.resetPassword);

router.put("/profileupdate", authorizeUser, userController.updateUser);

module.exports = router;
