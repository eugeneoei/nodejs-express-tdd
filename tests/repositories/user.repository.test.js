// Note: when using "new" and "save" approach, constructor function is required. "save" is a document method
// const mockSave = jest.fn()
// const mockUserModel = jest.fn().mockImplementation(() => ({
//     save: mockSave,
// }))
// jest.mock('../../models/user.model', () => mockUserModel)

// const UserRepository = require('../../repositories/user.repository')

// describe('User Repository', () => {
//     let userRepository

//     beforeAll(() => {
//         userRepository = new UserRepository()
//     })

//     describe('createUser method', () => {
//         it('Should return new user object', async () => {
//             const payload = {
//                 email: 'jon.doe@email.com',
//                 firstName: 'Jon',
//                 lastName: 'Doe',
//                 password: 'password1',
//             }
//             const expectedUser = {
//                 _id: '1',
//                 email: 'jon.doe@email.com',
//                 firstName: 'Jon',
//                 lastName: 'Doe',
//             }
//             mockSave.mockImplementationOnce(() => expectedUser)

//             const user = await userRepository.createUser(
//                 payload.email,
//                 payload.firstName,
//                 payload.lastName,
//                 payload.password
//             )

//             expect(user).toEqual(expectedUser)
//         })

//         it('should throw an error when new instance of User fails', async () => {
//             const payload = {
//                 email: 'jon.doe@email.com',
//                 firstName: 'Jon',
//                 lastName: 'Doe',
//             }
//             mockUserModel.mockImplementationOnce(() => {
//                 throw new Error('Something went wrong!')
//             })
//             const expectedError = {
//                 error: 'Something went wrong!',
//             }

//             const user = await userRepository.createUser(
//                 payload.email,
//                 payload.firstName,
//                 payload.lastName
//             )

//             expect(user).toEqual(expectedError)
//         })
//     })
// })


// Note: when using "create" approach does not require constructor function. "create" is a model method
const mockCreate = jest.fn()
const mockFindOne = jest.fn()
jest.mock('../../models/user.model', () => ({
    create: mockCreate,
    findOne: mockFindOne
}))

const UserRepository = require('../../repositories/user.repository')

describe('User Repository', () => {
    let userRepository

    beforeAll(() => {
        userRepository = new UserRepository()
    })

    describe('createUser method', () => {
        it('Should return new user object', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
            }
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockCreate.mockImplementationOnce(() => expectedUser)

            const user = await userRepository.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            expect(user).toEqual(expectedUser)
        })

        it('should throw an error when new instance of User fails', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockCreate.mockImplementationOnce(() => {
                throw new Error('Something went wrong!')
            })
            const expectedError = {
                error: 'Something went wrong!',
            }

            const user = await userRepository.createUser(
                payload.email,
                payload.firstName,
                payload.lastName
            )

            expect(user).toEqual(expectedError)
        })
    })

    describe('getUserByEmail method', () => {
        it('Should return user if found', async () => {
            const payload = 'jon.doe@email.com'
            const expectedUser = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockFindOne.mockImplementationOnce(() => expectedUser)

            const user = await userRepository.getUserByEmail(payload)

            expect(user).toBe(expectedUser)
        })

        it('Should return null if user is not found', async () => {
            const payload = 'hulk@email.com'
            const expectedUser = null
            mockFindOne.mockImplementationOnce(() => expectedUser)

            const user = await userRepository.getUserByEmail(payload)

            expect(user).toBe(expectedUser)
        })
    })
})
