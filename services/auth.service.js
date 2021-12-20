const bcrypt = require('bcrypt')

const UserRepository = require('../repositories/user.repository')

class AuthService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    createUser(email, firstName, lastName, password) {
        /**
         * NOTE: could potentially emit a user creation success event. eg subscriber could be welcome email notification
         */
        const hashedPassword = this.hashPassword(password)
        const user = this.userRepository.createUser(
            email,
            firstName,
            lastName,
            hashedPassword
        )
        return user
    }

    hashPassword(password) {
        if (typeof password !== 'string') {
            throw new Error('Password must be of string type.')
        }
        return bcrypt.hash(
            password,
            process.env.SALT_ROUNDS,
            (err, hash) => hash
        )
    }

    verifyPassword(email, password) {
        /**
         * TODO: hash given password and check that it matches hashed password in db
         */
        const user = this.userRepository.getUserByEmail(email)
        return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    }

    generateTokens(payload) {
        /**
         * TODO: implement JWT
         */
        return {
            accessToken: 'qwe123',
            refreshToken: 'asd123',
        }
    }
}

module.exports = AuthService
