const AuthService = require('../../services/auth.service')

describe('Auth Service', () => {
    let authService

    beforeAll(() => {
        authService = new AuthService()
    })

    it('Should contain the methods createUser and generateTokens', () => {
        expect(authService.createUser).toBeDefined()
        expect(authService.generateTokens).toBeDefined()
    })
})
