class UserService {
    createUser(email, firstName, lastName, password) {
        return {
            id: '1',
            email,
            firstName,
            lastName,
        }
    }

    getAllUsers() {
        return [
            {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
        ]
    }

    getUserById(id) {
        const users = [
            {
                id: '1',
                email: 'peter.parker@email.com',
                firstName: 'Peter',
                lastName: 'Parker',
            },
            {
                id: '2',
                email: 'mary.jane@email.com',
                firstName: 'Mary',
                lastName: 'Jane',
            },
            {
                id: '3',
                email: 'tony.stark@email.com',
                firstName: 'Tony',
                lastName: 'Stark',
            }
        ]
        return users.find(user => user.id === id)
    }
}

module.exports = UserService
