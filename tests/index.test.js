var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')

var express = require('express')

describe('GET /hello', () => {
	let app, request, responseStub, route

	beforeEach(() => {
		responseStub = sinon.stub()
		app = express()
		route = proxyquire('../controllers/index.js', {})
		route(app)
		request = supertest(app)
	})

	it('Should respond with status code 200 and message "world"', (done) => {
		const expectedRessult = {
			message: 'world',
		}
		responseStub.returns(expectedRessult)

		request
			.get('/hello')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(expectedRessult)
				done()
			})
			.catch((err) => done(err))
	})
})

describe('POST /hello', () => {
	let app, request, route

	beforeEach(() => {
		app = express()
		route = proxyquire('../controllers/index.js', {})
		route(app)
		request = supertest(app)
	})

	it('Should respond with status 404', (done) => {
		request
			.post('/hello')
			.expect(404)
            .then(() => {
                done()
            })
            .catch((err) => done(err))
	})
})
