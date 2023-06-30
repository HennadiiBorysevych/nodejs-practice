const { Schema, model } = require("mongoose");
const { mongooseErrorHandler } = require("../utils");
const Joi = require("joi");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.post("save", mongooseErrorHandler);

const registrSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verify = Joi.object({
  email: Joi.string().required(),
});

const authSchemas = {
  registrSchema,
  loginSchema,
  verify,
};

const User = model("user", userSchema);

module.exports = { User, authSchemas };
