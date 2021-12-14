const express = require('express')
const AuthService = require('../services/auth.service')

const authController = (app) => {
    const router = express.Router()
    const authService = new AuthService()

    app.use('/auth', router)

    router.post('/register', (req, res) => {
        const { email, firstName, lastName, password } = req.body
        const user = authService.createUser(email, firstName, lastName, password)
        res.status(201).json(user)
    })
}

module.exports = authController
