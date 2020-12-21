'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');
const ObjectID = require("mongodb").ObjectID;

const dishesSchema = new mongoose.Schema({
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
            type: Array,
            required: false
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

module.exports = mongoose.model('Dishes', dishesSchema, 'dishes');