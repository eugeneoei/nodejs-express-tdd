const mockCreateUser = jest.fn()
const mockVerifyPassword = jest.fn()
const mockGenerateTokens = jest.fn()
const mockAuthService = jest.fn(() => ({
    // Note: if test cases have behaviour assertions, a higher order mock function needs to be returned
    // jest.fn().mockImplementation(() => ({...}))
    createUser: mockCreateUser,
    verifyPassword: mockVerifyPassword,
    generateTokens: mockGenerateTokens,
}))
jest.mock('../../services/auth.service', () => mockAuthService)

const supertest = require('supertest')
const app = require('../mocks/express.mock')
const authController = require('../../controllers/auth.controller')

describe('Auth controller', () => {
    let request

    beforeAll(() => {
        authController(app)
        request = supertest(app)
    })

    describe('POST /auth/register', () => {
        it('Should successfully create new user and return new User', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockCreateUser.mockImplementationOnce(() => expectedUser)

            const response = await request.post('/auth/register').send(payload)

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expectedUser)
        })

        it('Should fail to create a user and respond with status code 400', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedError = {
                error: 'Something went wrong!',
            }
            mockCreateUser.mockImplementationOnce(() => {
                throw new Error('Something went wrong!')
            })

            const response = await request.post('/auth/register').send(payload)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expectedError)
        })
    })

    describe('POST /auth/login', () => {
        it('Should return an access token and refresh token if provided credentials are valid', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedTokens = {
                accessToken: 'asd123',
                refreshToken: 'qwe123',
            }
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockVerifyPassword.mockImplementationOnce(() => expectedUser)
            mockGenerateTokens.mockImplementationOnce(() => expectedTokens)

            const response = await request.post('/auth/login').send(payload)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedTokens)
        })

        it('Should fail to return tokens if provided credentials are invalid', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedError = {
                error: 'Invalid email or password.',
            }
            mockVerifyPassword.mockImplementationOnce(() => {
                throw new Error('Invalid email or password.')
            })

            const response = await request.post('/auth/login').send(payload)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expectedError)
        })
    })
})
