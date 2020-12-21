'use strict';

class DishService {
    constructor(log, mongoose, httpStatus, errs) {
        this.log = log;
        this.mongoose = mongoose;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async createDish(body) {
        const Dishes = require('../models/Dishes');

        let newDish = new Dishes(body);
        newDish = await newDish.save();

        this.log.info('Dish Created Successfully');
        return newDish;
    }

    async getDishes(searchString) {
        const Dishes = require('../models/Dishes');

        let query = {};
        if (searchString) {
            query.name = new RegExp(searchString, 'i');
            this.log.debug(`Dishes service query=[${query}]`);
        }


        const dishes = await Dishes.find(query);
        this.log.info('Dishes fetched Successfully');
        return dishes;
    }
}

module.exports = DishService;