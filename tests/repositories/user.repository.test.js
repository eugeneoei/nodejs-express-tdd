const sinon = require('sinon')

const UserRepository = require('../../repositories/user.repository')

describe('User Repository', () => {
    let userRepository

    beforeAll(() => {
        userRepository = new UserRepository()
    })

    describe('Interface', () => {
        it('Should have the methods createUser and getUserByEmail', () => {
            expect(userRepository.createUser).toBeDefined()
            expect(userRepository.getUserByEmail).toBeDefined()
        })
    })

    describe('createUser method', () => {

        it('Should return new user object when called with email, firstName, lastName and password', () => {
            const expectedResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe'
            }
            const response = userRepository.createUser()

            expect(response).toEqual(expectedResult)
        });
    });
})
