const express = require('express')
const UserService = require('../services/user-service')

const userService = new UserService()

const usersController = (app) => {
    const router = express.Router()

    app.use(express.json())
    app.use(router)

    router.post('/users', (req, res) => {
        try {
            const { email, firstName, lastName, password } = req.body
            const user = userService.createUser(email, firstName, lastName, password)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    })
}

module.exports = usersController
