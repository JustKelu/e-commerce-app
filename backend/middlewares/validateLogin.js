const { body, validationResult } = require("express-validator");

const validations = [
    body("email").trim().isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password").trim().isString().withMessage("Invalid password"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validations;