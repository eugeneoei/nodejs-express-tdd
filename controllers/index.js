const express = require('express')

const indexController = (app) => {
	const router = express.Router()

	app.use(router)

	router.get('/hello', (req, res) => {
		res.json({
			message: 'world',
		})
	})
}

module.exports = indexController
