class UserRepository {

    // TODO: use model and create
    createUser(email, firstName, lastName, password) {
        return {
            id: '1',
            email: 'jon.doe@email.com',
            firstName: 'Jon',
            lastName: 'Doe'
        }
    }

    // TODO: use model and get
    getUserByEmail(email) {
        return 1
    }
}

module.exports = UserRepository