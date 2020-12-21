'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const ingredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: false
    },
    quantity: {
        type: String,
        required: false,
        unique: false,
        lowercase: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Ingredients', ingredientsSchema, 'ingredients');