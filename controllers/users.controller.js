const express = require('express')
const UserService = require('../services/user.service')

const usersController = (app) => {
    const router = express.Router()
    const userService = new UserService()

    app.use(express.json())
    app.use(router)

    router.post('/users', (req, res) => {
        try {
            const { email, firstName, lastName, password } = req.body
            const user = userService.createUser(email, firstName, lastName, password)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({
                [error.name]: error.message
            })
        }
    })

    router.get('/users', (req, res) => {
        try {
            const users = userService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({
                [error.name]: error.message
            })
        }
    })

    router.get('/users/:userId', (req, res) => {
        try {
            const user = userService.getUserById(req.params.id)
            if (!user) {
                return res.status(404).json({
                    error: 'User not found.'
                })
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({
                [error.name]: error.message
            })
        }
    })
}

module.exports = usersController
