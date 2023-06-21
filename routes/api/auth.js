const express = require("express");
const { validateBody } = require("../../middlewares");
const { authSchema } = require("../../models/user");
const controller = require("../../controllers/auth/auth");
const router = express.Router();

router.post("/register", validateBody(authSchema.registrSchema),controller.register);

module.exports = router;
