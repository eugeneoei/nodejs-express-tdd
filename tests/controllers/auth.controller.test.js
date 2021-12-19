const mockCreateUser = jest.fn()
const mockAuthService = jest.fn().mockImplementation(() => ({
    createUser: mockCreateUser
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
            expect(mockCreateUser).toHaveBeenCalledWith(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )
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

    // describe('POST /auth/login', () => {
    //     let generateTokensStub, verifyPasswordStub

    //     beforeAll(() => {
    //         generateTokensStub = sinon.stub(
    //             AuthService.prototype,
    //             'generateTokens'
    //         )
    //         verifyPasswordStub = sinon.stub(
    //             AuthService.prototype,
    //             'verifyPassword'
    //         )
    //     })

    //     afterEach(() => {
    //         generateTokensStub.reset()
    //         verifyPasswordStub.reset()
    //     })

    //     it('Should return an access token and refresh token if provided credentials are valid', (done) => {
    //         const payload = {
    //             email: 'jon.doe@email.com',
    //             password: 'password1',
    //         }
    //         const expectedTokensResult = {
    //             accessToken: 'asd123',
    //             refreshToken: 'qwe123',
    //         }
    //         const expectedUserResult = {
    //             id: '1',
    //             email: 'jon.doe@email.com',
    //             firstName: 'Jon',
    //             lastName: 'Doe',
    //         }
    //         verifyPasswordStub.returns(expectedUserResult)
    //         generateTokensStub.returns(expectedTokensResult)

    //         request
    //             .post('/auth/login')
    //             .send(payload)
    //             .then((res) => {
    //                 const tokens = res.body
    //                 expect(res.status).toBe(200)
    //                 expect(verifyPasswordStub.calledOnceWithExactly(
    //                     payload.email,
    //                     payload.password,
    //                 ))
    //                 expect(
    //                     generateTokensStub.calledOnceWithExactly({
    //                         id: expectedUserResult.id
    //                     })
    //                 ).toBeTruthy()
    //                 expect(tokens).toEqual(expectedTokensResult)
    //                 expect(tokens.accessToken).toBeDefined()
    //                 expect(tokens.refreshToken).toBeDefined()
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })

    //     it('Should fail to return tokens if email and password in payload are invalid and respond with status code 400 and "Invalid email or password." message', (done) => {
    //         const payload = {
    //             email: 'jon.doe@email.com',
    //             password: 'password1',
    //         }
    //         const expectedResult = {
    //             error: 'Invalid email or password.'
    //         }
    //         verifyPasswordStub.throws(() => new Error('Invalid email or password.'))

    //         request
    //             .post('/auth/login')
    //             .send(payload)
    //             .then((res) => {
    //                 expect(res.status).toBe(400)
    //                 expect(res.body).toEqual(expectedResult)
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })
    // })
})
