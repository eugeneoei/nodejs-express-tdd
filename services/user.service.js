class UserService {
    createUser(email, firstName, lastName, password) {
        return {
            id: 1,
            email,
            firstName,
            lastName,
        }
    }

    getAllUsers() {
        return [
            {
                id: 1,
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
        ]
    }
}

module.exports = UserService
