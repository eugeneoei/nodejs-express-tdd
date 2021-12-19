const mockUserRespositoryCreateUser = jest.fn()
const mockGetUserByEmail = jest.fn()
const mockUserRespository = jest.fn().mockImplementation(() => ({
    createUser: mockUserRespositoryCreateUser,
    getUserByEmail: mockGetUserByEmail,
}))
jest.mock('../../repositories/user.repository', () => mockUserRespository)

const mockBcryptHash = jest.fn()
jest.mock('bcrypt', () => ({
    hash: mockBcryptHash,
}))

const AuthService = require('../../services/auth.service')

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

    describe('generateToken method', () => {
        it('Should return access and refresh token', () => {
            const payload = {
                id: '123',
            }
            const expectedTokens = {
                accessToken: 'qwe123',
                refreshToken: 'asd123',
            }

            const response = authService.generateTokens(payload)

            expect(response).toEqual(expectedTokens)
        })
    })

    describe('hashPassword method', () => {
        it('Should return hashed password given a string', () => {
            const payload = 'password123'
            const expectedHashedPassword = `${payload}^&*(UHsdf)123`
            mockBcryptHash.mockImplementationOnce(() => expectedHashedPassword)

            const response = authService.hashPassword(payload)
            expect(response).toBe(expectedHashedPassword)
            expect(response).not.toBe(payload)
        })

        it('Should throw an error if given password is not a string', () => {
            const payload = 123456

            expect(() => {
                authService.hashPassword(payload)
            }).toThrow()
        })
    })
})
