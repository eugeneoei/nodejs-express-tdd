const UserRepository = require('../repositories/user.repository')

class AuthService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    createUser(email, firstName, lastName, password) {
        /**
         * NOTE: could potentially emit a user creation success event. eg subscriber could be welcome email notification
         */
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
        const user = this.userRepository.getUserByEmail(email)
        return user
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
