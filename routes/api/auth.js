const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { authSchemas } = require("../../models/user");
const controller = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(authSchemas.registrSchema),
  controller.register
);

router.post("/login", validateBody(authSchemas.loginSchema), controller.login);

router.get("/current", authenticate, controller.current);

router.post("/logout", authenticate, controller.logout);

router.patch("/", authenticate, controller.subscriptionChange);

module.exports = router;
