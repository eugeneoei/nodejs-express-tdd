const User = require('../models/user.model')

class UserRepository {

    async createUser(email, firstName, lastName, password) {
        // Note: document approach
        // try {
        //     const newUser = await new User({
        //         email,
        //         firstName,
        //         lastName,
        //         password
        //     })
        //     return newUser.save()
        // } catch (error) {
        //     return {
        //         error: error.message
        //     }
        // }

        // Note: model approach
        try {
            const newUser = await User.create({
                email,
                firstName,
                lastName,
                password
            })
            return newUser
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    async getUserByEmail(email) {
        const user = await User.findOne({ email })
        if (user) {
            return user
        }
        return null
    }
}

module.exports = UserRepository