const express = require("express");
const { register, login, testAdmin, deleteUser, getAllUser, adminAccess } = require("../controllers/auth-controller");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/test-admin").get(requireSignIn, isAdmin, testAdmin);
router.route("/get-all-user").get(requireSignIn, isAdmin, getAllUser)
router.route("/delete-user/:id").delete(requireSignIn, isAdmin, deleteUser);
router.route("/admin-access/:id").put(requireSignIn, isAdmin, adminAccess);



module.exports = router