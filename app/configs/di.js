'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('logger', () => {
    return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('httpStatus', () => {
    return require('http-status');
});

serviceLocator.register('mongoose', () => {
    return require('mongoose');
});

serviceLocator.register('errs', () => {
    return require('restify-errors');
});

serviceLocator.register('dishService', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const httpStatus = serviceLocator.get('httpStatus');
    const errs = serviceLocator.get('errs');
    const DishService = require('../services/dish');

    return new DishService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('dishController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const dishService = serviceLocator.get('dishService');
    const ingredientService = serviceLocator.get('ingredientService');
    const DishController = require('../controllers/dish');

    return new DishController(log, dishService, ingredientService, httpStatus);
});

serviceLocator.register('ingredientService', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const httpStatus = serviceLocator.get('httpStatus');
    const errs = serviceLocator.get('errs');
    const IngredientService = require('../services/ingredient');

    return new IngredientService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('ingredientController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const ingredientService = serviceLocator.get('ingredientService');
    const IngredientController = require('../controllers/ingredient');

    return new IngredientController(log, ingredientService, httpStatus);
});

serviceLocator.register('mealService', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const httpStatus = serviceLocator.get('httpStatus');
    const errs = serviceLocator.get('errs');
    const MealService = require('../services/meal');

    return new MealService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('mealController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const mealService = serviceLocator.get('mealService');
    const MealController = require('../controllers/meal');

    return new MealController(log, mealService, httpStatus);
});

module.exports = serviceLocator;