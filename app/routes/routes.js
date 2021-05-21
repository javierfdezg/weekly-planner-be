'use strict';

module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/ingredients',
            name: 'Create Ingredient',
            version: '1.0.0',
        },
        (req, res, next) =>
            serviceLocator.get('ingredientController').create(req, res, next)
    );

    server.get(
        {
            path: '/ingredients',
            name: 'Get Ingredients',
            version: '1.0.0',
        },
        (req, res, next) => {
            serviceLocator.get('ingredientController').getAll(req, res, next);
        }
    );


    server.post(
        {
            path: '/dishes',
            name: 'Create Dish',
            version: '1.0.0',
        },
        (req, res, next) => {
            console.log(req.body);
            serviceLocator.get('dishController').create(req, res, next);
        }
    );

    server.get(
        {
            path: '/dishes',
            name: 'Get Dishes',
            version: '1.0.0',
        },
        (req, res, next) => {
            serviceLocator.get('dishController').getAll(req, res, next);
        }
    );

    server.get(
        {
            path: '/dishes/:_id',
            name: 'Get Dishes',
            version: '1.0.0',
        },
        (req, res, next) => {
            serviceLocator.get('dishController').get(req, res, next);
        }
    );

    server.post(
        {
            path: '/meals',
            name: 'Create Meal',
            version: '1.0.0',
        },
        (req, res, next) => {
            serviceLocator.get('mealController').create(req, res, next);
        }
    );
};