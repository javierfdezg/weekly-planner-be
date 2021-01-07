'use strict';

class DishController {
    constructor(log, dishService, ingredientService, httpSatus) {
        this.log = log;
        this.dishService = dishService;
        this.ingredientService = ingredientService;
        this.httpSatus = httpSatus;
    }

    async create(req, res) {
        try {
            const { body } = req;

            let result = await this.dishService.createDish(body);

            console.log(result)
            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async getAll(req, res) {
        try{
            let searchString = '';
            if (req.query && req.query.search)
                searchString = req.query.search;

            this.log.debug(`Dishes controller: search=[${searchString}]`);
            const result = await this.dishService.getDishes(searchString);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async get(req, res) {
        try{
            this.log.debug(`Dishes controller: get=[${req.params._id}]`);
            const result = await this.dishService.getDish(req.params._id);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }
}

module.exports = DishController;