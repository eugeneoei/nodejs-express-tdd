const express = require('express')

// const UserService = require('../services/user-service')

// const userService = new UserService()

const usersController = (app) => {
    const router = express.Router()

    app.use(router)

    router.post('/users', (req, res) => {
        // const user = userService.createUser(req.body)
        // res.status(201).json(user)
        res.status(201).json({
            id: 1,
            email: 'jon.doe@email.com',
            firstName: 'Jon',
            lastName: 'Doe',
        })
    })
}

module.exports = usersController
