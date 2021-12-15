const UserRepository = require('../repositories/user.repository')

class AuthService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    createUser(email, firstName, lastName, password) {
        const user = this.userRepository.createUser(email, firstName, lastName, password)
        return user
    }

    /**
     *
     * @returns user object
     */
    verifyPassword(email, password) {
        /**
         * TODO: calls userRepository to retrieve user by email and verify that password is correct
         */
        return {
            id: '1',
            email: 'jon.doe@email.com',
            firstName: 'Jon',
            lastName: 'Doe',
        }
    }

    generateTokens(payload) {
        /**
         * TODO: implement JWT
         */
        return {
            accessToken: 'qwe123',
            refreshToken: 'asd123'
        }
    }
}

module.exports = AuthService
