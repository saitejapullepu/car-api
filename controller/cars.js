const { Car, validate } = require("../models/cars");
const { car_models } = require("../models/car_model");
const { Type } = require("../models/type");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const validateReqBody = require("../middleware/validateReqBody");
const express = require("express");
const router = express.Router();

const notFoundError = "Car with given ID does not exist.";
const car_modelsIdError = "Invalid car_model.";
const typeIdError = "Invalid type.";

router.get("/", async (req, res) => {
  const cars = await Car.find().sort("name");
  res.send(cars);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(404).send(notFoundError);

  res.send(car);
});

router.post("/", [auth, admin, validateReqBody(validate)], async (req, res) => {
  const brand = await car_models.findById(req.body.car_modelsId);
  if (!brand) return res.status(400).send(car_modelsIdError);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send(typeIdError);

  const car = new Car(setValues(req, car_models, type));
  await car.save();

  res.status(201).send(car);
});

router.put(
  "/:id",
  [auth, admin, validateObjectId, validateReqBody(validate)],
  async (req, res) => {
    const brand = await car_models.findById(req.body.car_modelsId);
    if (!brand) return res.status(400).send(car_modelsIdError);

    const type = await Type.findById(req.body.typeId);
    if (!type) return res.status(400).send(typeIdError);

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      setValues(req, car_models, type),
      {
        new: true
      }
    );

    if (!car) return res.status(404).send(notFoundError);

    res.send(car);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car) return res.status(404).send(notFoundError);

  res.send("sucessfully deleted");
});

function setValues(req, car_models, type) {
  return {
    name: req.body.name,
    car_models: {
      _id: car_models._id,
      name: car_models.name
    },
    type: {
      _id: type._id,
      name: type.name
    },
    numberOfSeats: req.body.numberOfSeats,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  };
}

module.exports = router;
