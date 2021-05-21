'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const mealSchema = new mongoose.Schema({
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        title: {
            type: String,
            unique: true,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        originalDishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Meal', mealSchema);