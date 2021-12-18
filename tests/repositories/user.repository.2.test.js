const mockFindOne = jest.fn()
jest.mock('../../models/user.model', () => {
    return {
        findOne: mockFindOne
    }
})

const UserRepository = require('../../repositories/user.repository')

describe('User Repository', () => {
    let userRepository

    beforeAll(() => {
        userRepository = new UserRepository()
    })

    describe('getUserByEmail', () => {
        it('should return new User if a user exists', async () => {
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockFindOne.mockImplementationOnce(() => expectedUser)

            const user = await userRepository.getUserByEmail("i.exist@email.com")

            expect(user).toEqual(expectedUser)
        })

        it('should return null if a user does not exist', async () => {
            mockFindOne.mockImplementationOnce(() => false)  // here you can stub whatever value `User.findOne()` returns when it doesn't find a User in the DB

            const user = await userRepository.getUserByEmail("non.existant@email.com")

            expect(user).toEqual(null)
        })
    })
})
