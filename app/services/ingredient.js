'use strict';

class IngredientService {
    constructor(log, mongoose, httpStatus, errs) {
        this.log = log;
        this.mongoose = mongoose;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async createIngredient(body) {
        const Ingredients = require('../models/Ingredient');

        let ingredientQuery = {};
        if (body._id) {
            ingredientQuery._id = body._id;
            const ingredient = await(Ingredients.findOne(ingredientQuery));
            if (ingredient) {
                return ingredient;
            }
        }

        if (body.name) {
            const ingredient = await(Ingredients.findOne({ "name": {
                $regex: new RegExp(body.name, "i")
                }}));

            if (ingredient) {
                return ingredient;
            }
        }

        let newIngredient = new Ingredients(body);
        console.log(newIngredient);
        newIngredient = await newIngredient.save();

        this.log.info('Ingredient Created Successfully');
        return newIngredient;
    }

    async findIngredients(searchString) {
        const Ingredients = require('../models/Ingredient');

        let query = {};
        if (searchString) {
            query.name = new RegExp(searchString, 'i');
            this.log.debug(`Ingredients service query=[${query}]`);
        }

        const ingredients = await Ingredients.find(query);
        this.log.info('Ingredients fetched Successfully');
        return ingredients;
    }

    async getIngredientsFromList(ingredientList) {
        const Ingredients = require('../models/Ingredient');

        let ingredients = await Ingredients.find({_id: {
                $in: ingredientList
            }
        });

        return ingredients;
    }
}

module.exports = IngredientService;