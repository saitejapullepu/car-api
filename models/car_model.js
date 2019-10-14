const mongoose = require("mongoose");
const Joi = require("joi");
const car_models = mongoose.model(
    "car_models",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50
        }
    })
);
function validatecar_model(Car_model) {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(50)
            .required()
    };

    return Joi.validate(Car_model, schema);
}

exports.car_models = car_models;
exports.validate = validatecar_model;