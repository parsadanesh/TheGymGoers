import * as expressValidator from "express-validator";

export default class WorkoutValidator {
    static validate() {
        try {
            return [
                expressValidator.body("_id").optional().isMongoId(),
                [
                    expressValidator.body("name").notEmpty().isString().withMessage("Empty Name"),
                    
                    expressValidator.body("reps").optional().isMongoId(),
                
                    expressValidator.body("sets").optional().isMongoId(),
                
                    expressValidator.body("weight").optional(),
                
                    expressValidator.body("duration").optional()              
                ],
                UserValidator.handleValidationErrors
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static handleValidationErrors(req, res, next) {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}

