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
            expect(userRepositoryCreateUserStub.calledOnce()).toBeTruthy()
        })
    })
})
