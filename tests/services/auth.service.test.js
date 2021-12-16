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
        let userRepositoryCreateUserStub

        beforeAll(() => {
            userRepositoryCreateUserStub = sinon.stub(
                UserRepository.prototype,
                'createUser'
            )
        })

        afterEach(() => {
            userRepositoryCreateUserStub.reset()
        })

        it('Should call createUser method in userRepository and return new user object', () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
            }
            const expectedResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            userRepositoryCreateUserStub.returns(expectedResult)

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
            expect(response).toEqual(expectedResult)
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
                password: 'password1'
            }

            const response = authService.verifyPassword()

            expect(
                userRepositoryGetUserByEmailStub.calledOnceWithExactly(
                    payload.email
                )
            )
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
