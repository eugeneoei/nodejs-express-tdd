const express = require('express')
const UserService = require('../services/user.service')

const authController = (app) => {
    const router = express.Router()
    const userService = new UserService()

    app.use('/auth', router)

    router.post('/register', (req, res) => {
        const { email, firstName, lastName, password } = req.body
        const user = userService.createUser(email, firstName, lastName, password)
        res.status(201).json(user)
    })
}

module.exports = authController
