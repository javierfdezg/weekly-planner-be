'use strict';

class IngredientController {
    constructor(log, ingredientService, httpSatus) {
        this.log = log;
        this.ingredientService = ingredientService;
        this.httpSatus = httpSatus;
    }

    async create(req, res) {
        try {
            const { body } = req;
            const result = await this.ingredientService.createIngredient(body);

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
            const result = await this.ingredientService.getIngredients(searchString);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

}

module.exports = IngredientController;