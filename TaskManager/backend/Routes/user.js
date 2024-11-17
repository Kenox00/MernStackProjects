const express = require('express')

const router = express.Router()

const {logInUser, signUpUser} = require('../controllers/userController')

router.post('/login', logInUser )
router.post('/signup', signUpUser )

module.exports = router