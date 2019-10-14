const express = require("express");
const car_models = require("../controller/car_model");
const types = require("../controller/types");
const cars = require("../controller/cars");
const rentals = require("../controller/rentals");
const returns = require("../controller/returns");
const register = require("../controller/register");
const login = require("../controller/login");
const users = require("../controller/users");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/car_models", car_models);
  app.use("/api/types", types);
  app.use("/api/cars", cars);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use(error);
};
