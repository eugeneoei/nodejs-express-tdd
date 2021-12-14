const express = require('express')

const authController = (app) => {
    const router = express.Router()

    app.use('/auth', router)

    router.post('/register', (req, res) => {
        res.status(201).send()
    })
}

module.exports = authController
