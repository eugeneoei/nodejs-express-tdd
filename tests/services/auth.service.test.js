const sinon = require('sinon')

const AuthService = require('../../services/auth.service')
const UserRepository = require('../../repositories/user.repository')

describe('Auth Service', () => {
    let authService

    beforeAll(() => {
        authService = new AuthService()
    })

    it('Should contain the methods createUser and generateTokens', () => {
        expect(authService.createUser).toBeDefined()
        expect(authService.generateTokens).toBeDefined()
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

            authService.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            expect(userRepositoryCreateUserStub.calledOnce).toBeTruthy()
        })
    })
})
