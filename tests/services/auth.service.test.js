const sinon = require('sinon')

const AuthService = require('../../services/auth.service')
const UserRepository = require('../../repositories/user.repository')

describe('Auth Service', () => {
    let authService

    beforeAll(() => {
        authService = new AuthService()
    })

    describe('Interface', () => {
        it('Should contain the methods createUser and generateTokens', () => {
            expect(authService.createUser).toBeDefined()
            expect(authService.generateTokens).toBeDefined()
            expect(authService.verifyPassword).toBeDefined()
        })
    })

    describe('createUser method', () => {
        let userRepositoryCreateUserStub, authServiceHashPasswordSpy

        beforeAll(() => {
            userRepositoryCreateUserStub = sinon.stub(
                UserRepository.prototype,
                'createUser'
            )
            authServiceHashPasswordSpy = sinon.spy(
                AuthService.prototype,
                'hashPassword'
            )
        })

        afterEach(() => {
            userRepositoryCreateUserStub.reset()
            authServiceHashPasswordSpy.reset()
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
            userRepositoryCreateUserStub.returns(expectedUserResult)

            const response = authService.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            /**
             * Question: should response object properties to be tested with toBeDefined or comparing whole object would be suitable?
             */
            expect(
                userRepositoryCreateUserStub.calledOnceWithExactly(
                    payload.email,
                    payload.firstName,
                    payload.lastName,
                    payload.password
                )
            ).toBeTruthy()
            expect(
                authServiceHashPasswordSpy.calledOnceWithExactly(
                    payload.password
                )
            ).toBeTruthy()
            expect(response).toEqual(expectedUserResult)
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
})
