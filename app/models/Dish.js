'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const dishSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: false
        },
        preparationTime: {
            type: Number,
            required: false
        },
        ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }],
        imageUrl: {
            type: String,
            required: false,
            unique: false,
            lowercase: false
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Dish', dishSchema);