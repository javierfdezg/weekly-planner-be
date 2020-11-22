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
    const UserService = require('../services/dish');

    return new UserService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('dishController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const dishService = serviceLocator.get('dishService');
    const UserController = require('../controllers/dish');

    return new UserController(log, dishService, httpStatus);
});

module.exports = serviceLocator;