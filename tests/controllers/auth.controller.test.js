const sinon = require('sinon')
const supertest = require('supertest')

const app = require('../mocks/express.mock')
const authController = require('../../controllers/auth.controller')

describe('Auth controller', () => {

    let request

    beforeAll(() => {
        authController(app)
        request = supertest(app)
    })

    describe('/auth/register', () => {

        it('Should create a new user return user object with status code 201', (done) => {
            request
                .post('/auth/register')
                .then((res) => {
                    expect(res.status).toBe(201)
                    done()
                })
                .catch((err) => done(err))
        })

    })

})
