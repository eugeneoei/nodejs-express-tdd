const UserRepository = require('../repositories/user.repository')

class AuthService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    createUser(email, firstName, lastName, password) {
        const user = this.userRepository.createUser()
        return user
    }

    generateTokens(email, password) {
        return 1
    }
}

module.exports = AuthService
