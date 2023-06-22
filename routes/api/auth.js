const express = require("express");
const { validateBody } = require("../../middlewares");
const { authSchemas } = require("../../models/user");
const controller = require("../../controllers/auth/auth");

const router = express.Router();

router.post("/register", validateBody(authSchemas.registrSchema),controller.register);

router.post("/login", validateBody(authSchemas.loginSchema),controller.login);

module.exports = router;
