const mongoose = require("mongoose");
const Joi = require("joi");
const { car_models } = require("./car_model");
const { Type } = require("./type");

const Car = mongoose.model(
    "Car",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50
        },
        car_models: {
            type: car_models.schema,
            required: true
        },
        type: {
            type: Type.schema,
            required: true
        },
        numberOfSeats: {
            type: Number,
            min: 1,
            max: 255,
            default: 5
        },

        numberInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
        }
    })
);

function validateCar(car) {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(50)
            .required(),
        car_modelsId: Joi.objectId().required(),
        typeId: Joi.objectId().required(),
        numberOfSeats: Joi.number()
            .integer()
            .min(1),
        numberInStock: Joi.number()
            .integer()
            .min(0)
            .required(),
        dailyRentalRate: Joi.number()
            .min(0)
            .required()
    };

    return Joi.validate(car, schema);
}

exports.Car = Car;
exports.validate = validateCar;