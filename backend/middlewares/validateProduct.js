const {header, body, validationResult} = require('express-validator');

validations = [
    header("authorization").exists().withMessage("Authorization header missing"),
    body('name').isString().notEmpty().withMessage('Name is required and must be a string.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required and must be a number greater than 0.'),
    body('description').isString().notEmpty().withMessage('Description is required and must be a string.'),
    body('imageUrl').isURL().withMessage('Image URL is required and must be a valid URL.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validations;