const UserModel = require('../models/user.model')

class UserRepository {

    createUser(email, firstName, lastName, password) {
        const newUser = new UserModel({
            email,
            firstName,
            lastName,
            password
        })
        return newUser.save()
    }

    getUserByEmail(email) {
        return 1
    }
}

module.exports = UserRepository