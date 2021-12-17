const sinon = require('sinon')
const bcrypt = require('bcrypt')

const AuthService = require('../../services/auth.service')
const UserRepository = require('../../repositories/user.repository')

describe('Auth Service', () => {
    let authService

    beforeAll(() => {
        authService = new AuthService()
    })

    describe('Interface', () => {
        it('Should contain the methods createUser, hashPassword, verifyPassword and generateTokens', () => {
            expect(authService.createUser).toBeDefined()
            expect(authService.generateTokens).toBeDefined()
            expect(authService.verifyPassword).toBeDefined()
            expect(authService.hashPassword).toBeDefined()
        })
    })

    describe('createUser method', () => {
        let userRepositoryCreateUserStub, authServiceHashPasswordStub

        beforeAll(async () => {
            userRepositoryCreateUserStub = sinon.stub(
                UserRepository.prototype,
                'createUser'
            )
            authServiceHashPasswordStub = sinon.stub(
                AuthService.prototype,
                'hashPassword'
            )
        })

        afterEach(() => {
            userRepositoryCreateUserStub.reset()
            authServiceHashPasswordStub.reset()
        })

        it('Should call createUser method in userRepository and hashPassword method in authService and return new user object', () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
            }
            const expectedUserResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            const expectedHashedPassword = `${payload.password}#(sdasdaqwej302rk!`
            userRepositoryCreateUserStub.returns(expectedUserResult)
            authServiceHashPasswordStub.returns(expectedHashedPassword)

            const res = authService.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )
            /**
             * Question: should response object properties be tested with toBeDefined or comparing whole object would be suitable?
             */
            expect(
                userRepositoryCreateUserStub.calledOnceWithExactly(
                    payload.email,
                    payload.firstName,
                    payload.lastName,
                    expectedHashedPassword
                )
            ).toBeTruthy()
            expect(
                authServiceHashPasswordStub.calledOnceWithExactly(
                    payload.password
                )
            ).toBeTruthy()
            expect(
                authServiceHashPasswordStub.calledBefore(
                    userRepositoryCreateUserStub
                )
            ).toBe(true)
            expect(res).toEqual(expectedUserResult)
        })
    })

    describe('verifyPassword method', () => {
        let userRepositoryGetUserByEmailStub

        beforeAll(() => {
            userRepositoryGetUserByEmailStub = sinon.stub(
                UserRepository.prototype,
                'getUserByEmail'
            )
        })

        afterEach(() => {
            userRepositoryGetUserByEmailStub.reset()
        })

        it('Should return user object if given credentials are valid', () => {
            const payload = {
                email: 'jon.doe@email.com',
                password: 'password1',
            }
            const expectedResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: '123dj4*#&@DJ@941nd',
            }
            userRepositoryGetUserByEmailStub.returns(expectedResult)

            const response = authService.verifyPassword(
                payload.email,
                payload.password
            )

            // Question: is there a need to expect steps to hash payload's password and compare against password in db?
            expect(
                userRepositoryGetUserByEmailStub.calledOnceWithExactly(
                    payload.email
                )
            ).toBeTruthy()
            expect(response.id).toBeDefined()
            expect(response.email).toBeDefined()
            expect(response.firstName).toBeDefined()
            expect(response.lastName).toBeDefined()
            expect(response.password).toBeDefined()
        })
    })

    describe('generateToken method', () => {
        it('Should return access and refresh token when called', () => {
            const payload = {
                id: '123',
            }

            const response = authService.generateTokens(payload)

            /**
             * Question: since response will always be a different value, does that mean unit test should simply assert that accessToken and refreshToken properties exist?
             */
            expect(response).toBeTruthy()
            expect(response.accessToken).toBeDefined()
            expect(response.refreshToken).toBeDefined()
        })
    })

    describe('hashPassword method', () => {
        let bcryptHashStub

        beforeAll(() => {
            // Question: why is there a need to restore sinon object? Why does restoring stub fail?
            sinon.restore()
            bcryptHashStub = sinon.stub(bcrypt, 'hash')
        })

        it('Should return hashed password given a string', () => {
            const payload = 'password123'
            const expectedResult = `${payload}^&*(UHsdf)123`
            bcryptHashStub.returns(expectedResult)

            const response = authService.hashPassword(payload)
            expect(response).toBe(expectedResult)
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
