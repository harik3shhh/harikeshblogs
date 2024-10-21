const express = require("express");
const { register, login, testAdmin, deleteUser, getAllUser, adminAccess } = require("../controllers/auth-controller");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");
const { feedbackController, getFeedbackController } = require("../controllers/feedback-controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/test-admin").get(requireSignIn, isAdmin, testAdmin);
router.route("/get-all-user").get(requireSignIn, isAdmin, getAllUser)
router.route("/delete-user/:id").delete(requireSignIn, isAdmin, deleteUser);
router.route("/admin-access/:id").put(requireSignIn, isAdmin, adminAccess);


router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
});


router.get("/admin-auth", requireSignIn,isAdmin, (req, res)=>{
    res.status(200).send({ok: true});
});



// ROUTE FOR FEEDBACK HERE....
router.post("/feedback", feedbackController);
router.get("/get-feedback", getFeedbackController)


module.exports = router