const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/contact");
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", authenticate, isValidId, controllers.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.validationSchema),
  controllers.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.validationSchema),
  controllers.changeContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.favoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
