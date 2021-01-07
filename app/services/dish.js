'use strict';

class DishService {

    constructor(log, mongoose, httpStatus, errs) {
        this.log = log;
        this.mongoose = mongoose;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async createDish(body) {
        const Dish = require('../models/Dish');
        const Ingredient = require('../models/Ingredient');

        let newDish = new Dish(body);
        newDish = await newDish.save();

        return Dish.findOne({_id: newDish._id})
            .populate({ path: 'ingredients', model: Ingredient })
            .exec();
    }

    async getDishes(searchString) {

        const Dish = require('../models/Dish');
        const Ingredient = require('../models/Ingredient');

        let query = {};
        if (searchString) {
            query.name = new RegExp(searchString, 'i');
            this.log.debug(`Dishes service query=[${query}]`);
        }

        const dishes = await Dish.find(query).populate({ path: 'ingredients', model: Ingredient }).exec();
        this.log.info('Dishes fetched Successfully');

        console.log(dishes);
        return dishes;
    }

    async getDish(id) {
        const Dish = require('../models/Dish');
        const Ingredient = require('../models/Ingredient');

        const dish = await Dish.findOne({ _id: id }).populate({ path: 'ingredients', model: Ingredient }).exec();
        this.log.info('Dishes fetched Successfully');

        console.log(dish);
        return dish;
    }
}

module.exports = DishService;