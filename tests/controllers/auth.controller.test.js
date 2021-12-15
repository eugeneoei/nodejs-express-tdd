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
                error: 'Something went wrong!',
            }
            createUserStub.throws(() => new Error('Something went wrong!'))

            request
                .post('/auth/register')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('POST /auth/login', () => {
        let generateTokensStub, verifyPasswordStub

        beforeAll(() => {
            generateTokensStub = sinon.stub(
                AuthService.prototype,
                'generateTokens'
            )
            verifyPasswordStub = sinon.stub(
                AuthService.prototype,
                'verifyPassword'
            )
        })

        afterEach(() => {
            generateTokensStub.reset()
            verifyPasswordStub.reset()
        })

        it('Should return an access token and refresh token if provided credentials are valid', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedTokensResult = {
                accessToken: 'asd123',
                refreshToken: 'qwe123',
            }
            const expectedUserResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            verifyPasswordStub.returns(true)
            generateTokensStub.returns(expectedTokensResult)

            request
                .post('/auth/login')
                .send(payload)
                .then((res) => {
                    const tokens = res.body
                    expect(res.status).toBe(200)
                    expect(verifyPasswordStub.calledOnceWithExactly(
                        payload.email,
                        payload.password,
                    ))
                    expect(
                        generateTokensStub.calledOnceWithExactly({
                            id: expectedUserResult.id
                        })
                    ).toBeTruthy()
                    expect(tokens).toEqual(expectedTokensResult)
                    expect(tokens.accessToken).toBeDefined()
                    expect(tokens.refreshToken).toBeDefined()
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to return tokens if email and password in payload are invalid and respond with status code 400 and "Invalid email or password." message', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedResult = {
                error: 'Invalid email or password.'
            }
            generateTokensStub.throws(() => new Error('Invalid email or password.'))

            request
                .post('/auth/login')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })
})
