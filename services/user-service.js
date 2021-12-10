class UserService {

    createUser(email, firstName, lastName, password) {
        return {
            id: 1,
            email,
            firstName,
            lastName
        }
    }
}

module.exports = UserService