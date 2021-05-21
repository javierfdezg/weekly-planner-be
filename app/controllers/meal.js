'use strict';

class MealController {
    constructor(log, mealService, httpSatus) {
        this.log = log;
        this.mealService = mealService;
        this.httpSatus = httpSatus;
    }

    async create(req, res) {
        this.log.info('creating meal: controller');
        try {
            const { body } = req;
            let result = await this.mealService.create(body);

            console.log(result)
            res.send(result);
        } catch (err) {
            this.log.debug('catched');
            this.log.error(err.message);
            res.send(err);
        }
    }
}

module.exports = MealController;