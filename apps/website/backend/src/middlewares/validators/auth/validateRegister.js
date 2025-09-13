const { body, validationResult } = require("express-validator");

const validations = [
    body("name").trim().isLength({ min: 2 }).withMessage("Invalid name"),
    body("surname").trim().isLength({ min: 2 }).withMessage("Surname too short"),
    body("addressStreet").trim().isLength({ min: 5 }).withMessage("Invalid address"),
    body("addressNumber").trim().isInt({ min: 1, max: 999 }).withMessage("Invalid address number"),
    body("addressCity").trim().isLength({ min: 2 }).withMessage("Invalid City"),
    body("addressZip").isPostalCode("IT").withMessage("Invalid ZIP"),
    body("phoneNumber").optional().isMobilePhone("it-IT").withMessage("Invalid Phone Number"),
    body("email").trim().isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password too weak"),
    body("userType").isIn(['business', 'customer']).withMessage("Invalid user type"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validations;