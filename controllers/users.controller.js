const express = require('express')
const UserService = require('../services/user.service')

const usersController = (app) => {
    const router = express.Router()
    const userService = new UserService()

    app.use(router)

    router.get('/users', (req, res) => {
        try {
            const users = userService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.get('/users/:userId', (req, res) => {
        try {
            const user = userService.getUserById(req.params.userId)
            if (!user) {
                return res.status(404).json({
                    error: 'User not found.'
                })
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.patch('/users/:userId', (req, res) => {
        try {
            const user = userService.updateUserInfo(req.params.userId)
            if (!user) {
                return res.status(404).json({
                    error: 'User not found.'
                })
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })
}

module.exports = usersController
