const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { authSchemas } = require("../../models/user");
const controller = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(authSchemas.registrSchema),
  controller.register
);

router.get("/verify/:verificationToken", controller.verifyEmail);

router.post("/verify",validateBody(authSchemas.verify), controller.resendVerifacation);

router.post("/login", validateBody(authSchemas.loginSchema), controller.login);

router.get("/current", authenticate, controller.current);

router.post("/logout", authenticate, controller.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);

router.patch("/", authenticate, controller.subscriptionChange);

module.exports = router;
