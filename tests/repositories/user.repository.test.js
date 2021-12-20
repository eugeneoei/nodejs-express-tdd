const mockSave = jest.fn()
const mockUserModel = jest.fn().mockImplementation(() => ({
    save: mockSave,
}))
jest.mock('../../models/user.model', () => mockUserModel)

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
            mockSave.mockImplementationOnce(() => expectedUser)

            const user = await userRepository.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            expect(mockUserModel).toHaveBeenCalledTimes(1)
            expect(mockSave).toHaveBeenCalledTimes(1)
            expect(user).toEqual(expectedUser)
        })

        it('should throw an error when new instance of User fails', async () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            mockUserModel.mockImplementationOnce(() => {
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

    // describe('getUserByEmail method', () => {
    //     let userModelFindOneStub

    //     beforeAll(() => {
    //         userModelFindOneStub = sinon.stub(User, 'findOne')
    //     })

    //     afterEach(() => {
    //         userModelFindOneStub.reset()
    //     })

    //     it('Should return user that matches given email string', async () => {
    //         const payload = 'jon.doe@email.com'
    //         const expectedResult = {
    //             _id: '1',
    //             email: 'jon.doe@email.com',
    //             firstName: 'Jon',
    //             lastName: 'Doe',
    //         }
    //         userModelFindOneStub.returns(expectedResult)

    //         const response = await userRepository.getUserByEmail(payload)

    //         expect(userModelFindOneStub.calledOnce).toBe(true)
    //         expect(response).toBe(expectedResult)
    //     })

    //     it('Should return null if user is not found based on given email string', async () => {
    //         const payload = 'hulk@email.com'
    //         const expectedResult = null
    //         userModelFindOneStub.returns(expectedResult)

    //         const response = await userRepository.getUserByEmail(payload)

    //         expect(response).toBe(expectedResult)
    //     })
    // })
})
