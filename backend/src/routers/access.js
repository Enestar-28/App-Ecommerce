const express = require("express");
const {
  loginController,
  registerController,
  addressesController,
  meController,
  getAdressController,
  updateAddressesController,
  deleteAddressController,
  updateMeController,
  forgotPassController,
  resetPassController,
  changePasswordController,
} = require("../controllers/users.controller");
const { loginValidator } = require("../middlewares/user.middlewares");
const { updateMe } = require("../services/users.services");

const wrapAsync = require("../utils/handlers");

const router = express.Router();

router.post("/login", wrapAsync(loginController));
router.post("/register", wrapAsync(registerController));

router.post("/forgot-password", wrapAsync(forgotPassController));
//send email to user to change password
router.post("/reset-password", wrapAsync(resetPassController));

router.post("/change-password", wrapAsync(changePasswordController));
// //log out
// router.post('logout', logoutController)

router.get("/address/:user_id", wrapAsync(getAdressController));
router.post("/address", wrapAsync(addressesController));
router.put("/address", wrapAsync(updateAddressesController));
router.delete("/address", wrapAsync(deleteAddressController));

router.get("/me/:user_id", wrapAsync(meController));
router.put("/me", wrapAsync(updateMeController));

module.exports = router;
