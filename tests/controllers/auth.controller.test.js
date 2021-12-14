const sinon = require('sinon')
const supertest = require('supertest')

const app = require('../mocks/express.mock')
const authController = require('../../controllers/auth.controller')
const AuthService = require('../../services/auth.service')

describe('Auth controller', () => {

    let request

    beforeAll(() => {
        authController(app)
        request = supertest(app)
    })

    describe('POST /auth/register', () => {

        let createUserStub

        beforeAll(() => {
            createUserStub = sinon.stub(AuthService.prototype, 'createUser')
        })

        afterEach(() => {
            createUserStub.reset()
        })

        it('Should create a new user return user object with status code 201', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            createUserStub.returns(expectedResult)

            request
                .post('/auth/register')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(201)
                    expect(res.body).toEqual(expectedResult)
                    expect(
                        createUserStub.calledOnceWithExactly(
                            payload.email,
                            payload.firstName,
                            payload.lastName,
                            payload.password
                        )
                    ).toBe(true)
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to create a user and respond with status code 400', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedResult = {
                Error: 'Something went wrong!',
            }
            createUserStub.throws(() => new Error('Something went wrong!'))

            request
                .post('/auth/register')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(400)
                    done()
                })
                .catch((err) => done(err))
        })

    })

})
