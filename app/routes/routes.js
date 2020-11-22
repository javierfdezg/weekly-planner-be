'use strict';

module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/dishes',
            name: 'Create Dish',
            version: '1.0.0',
        },
        (req, res, next) =>
            serviceLocator.get('dishController').create(req, res, next)
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
};