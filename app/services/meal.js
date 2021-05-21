'use strict';

class MealService {

    constructor(log, mongoose, httpStatus, errs) {
        this.log = log;
        this.mongoose = mongoose;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async create(body) {
        console.log('creating meal');
        const Meal = require('../models/Meal');
        const Dish = require('../models/Dish');

        let meal = new Meal(body);
        meal = await meal.save();

        return Meal.findOne({_id: meal._id})
            .populate({ path: 'dishes', model: Dish })
            .exec();
    }
}

module.exports = MealService;