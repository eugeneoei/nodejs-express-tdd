// const sinon = require('sinon')
// const bcrypt = require('bcrypt')

const mockUserRespositoryCreateUser = jest.fn()
const mockGetUserByEmail = jest.fn()
const mockUserRespository = jest.fn().mockImplementation(() => ({
    createUser: mockUserRespositoryCreateUser,
    getUserByEmail: mockGetUserByEmail,
}))
jest.mock('../../repositories/user.repository', () => mockUserRespository)

const AuthService = require('../../services/auth.service')
// const UserRepository = require('../../repositories/user.repository')

describe('Auth Service', () => {
    let authService

    beforeAll(() => {
        authService = new AuthService()
    })

    describe('createUser method', () => {
        it('Should return new user object', () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
            }
            const expectedUser = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            const expectedHashedPassword = '#(sdasdaqwej302rk!'
            mockUserRespositoryCreateUser.mockImplementationOnce(
                () => expectedUser
            )
            /**
             * Question: is this the right way to mock this.hashPassword?
             */
            const spyHashPassword = jest
                .spyOn(AuthService.prototype, 'hashPassword')
                .mockImplementationOnce(() => expectedHashedPassword)

            const user = authService.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            expect(user).toEqual(expectedUser)
            expect(mockUserRespositoryCreateUser).toHaveBeenCalled()
            expect(mockUserRespositoryCreateUser).toHaveBeenCalledWith(
                payload.email,
                payload.firstName,
                payload.lastName,
                expectedHashedPassword
            )
            expect(spyHashPassword).toHaveBeenCalled()
        })
    })

    describe('verifyPassword method', () => {
        it('Should return user object if given credentials are valid', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockGetUserByEmail.mockImplementationOnce(() => expectedUser)

            const user = await authService.verifyPassword(
                payload.email,
                payload.password
            )

            expect(user).toEqual(expectedUser)
        })
    })

    // describe('generateToken method', () => {
    //     it('Should return access and refresh token when called', () => {
    //         const payload = {
    //             id: '123',
    //         }

    //         const response = authService.generateTokens(payload)

    //         /**
    //          * Question: since response will always be a different value, does that mean unit test should simply assert that accessToken and refreshToken properties exist?
    //          */
    //         expect(response).toBeTruthy()
    //         expect(response.accessToken).toBeDefined()
    //         expect(response.refreshToken).toBeDefined()
    //     })
    // })

    // describe('hashPassword method', () => {
    //     let bcryptHashStub

    //     beforeAll(() => {
    //         // Question: why is there a need to restore sinon object? Why does restoring stub fail?
    //         sinon.restore()
    //         bcryptHashStub = sinon.stub(bcrypt, 'hash')
    //     })

    //     it('Should return hashed password given a string', () => {
    //         const payload = 'password123'
    //         const expectedResult = `${payload}^&*(UHsdf)123`
    //         bcryptHashStub.returns(expectedResult)

    //         const response = authService.hashPassword(payload)
    //         expect(response).toBe(expectedResult)
    //         expect(response).not.toBe(payload)
    //     })

    //     it('Should throw an error if given password is not a string', () => {
    //         const payload = 123456

    //         expect(() => {
    //             authService.hashPassword(payload)
    //         }).toThrow()

    //     })

    // })
})
