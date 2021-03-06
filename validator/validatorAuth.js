const { body, check, validationResult } = require('express-validator');

exports.register = [
  check('name').not().notEmpty(), // name
  body('email')
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage('Email must be format email'),
  body('password').notEmpty(),
  body('passwordConfirmation')
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.login = [
  body('email').not().notEmpty(),
  body('password').not().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
