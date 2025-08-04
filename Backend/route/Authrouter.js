const { signup, login } = require('../controller/Authcontroller');
const { signupValidation, loginValidation } = require('../middleware/Authvalidation');
const router = require('express').Router();

// ✅ Route should look like this
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
