const mockGetAllUsers = jest.fn()
const mockGetUserById = jest.fn()
const mockUserService = jest.fn().mockImplementation(() => ({
    getAllUsers: mockGetAllUsers,
    getUserById: mockGetUserById,
}))
jest.mock('../../services/user.service', () => mockUserService)

const supertest = require('supertest')
const app = require('../mocks/express.mock')
const usersController = require('../../controllers/users.controller')

describe('Users Controller', () => {
    let request

    beforeAll(() => {
        usersController(app)
        request = supertest(app)
    })

    describe('GET /users', () => {
        it('Should return users and respond with status code 200', async () => {
            const expectedUsers = [
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
                },
            ]
            mockGetAllUsers.mockImplementationOnce(() => expectedUsers)

            const response = await request.get('/users')

            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedUsers)
            expect(mockGetAllUsers).toHaveBeenCalled()
        })

        it('Should fail to return users and respond with status code 400', async () => {
            const expectedError = {
                error: 'Something went wrong!',
            }
            mockGetAllUsers.mockImplementationOnce(() => {
                throw new Error('Something went wrong!')
            })

            const response = await request.get('/users')

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expectedError)
        })
    })

    describe('GET /users/:userId', () => {
        it('Should return user object that matches given id in url params and respond with status code 200', async () => {
            const expectedUser = {
                id: '2',
                email: 'mary.jane@email.com',
                firstName: 'Mary',
                lastName: 'Jane',
            }
            const userIdToGet = '2'
            mockGetUserById.mockImplementationOnce(() => expectedUser)

            const response = await request.get(`/users/${userIdToGet}`)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedUser)
            expect(mockGetUserById).toHaveBeenCalled()
        })

        it('Should return status code 404 if user is not found based on given userId in url params', async () => {
            const userIdToGet = '2'
            const expectedError = {
                error: 'User not found.',
            }
            mockGetUserById.mockImplementationOnce(() => null)

            const response = await request.get(`/users/${userIdToGet}`)

            expect(response.status).toBe(404)
            expect(response.body).toEqual(expectedError)
            expect(mockGetUserById).toHaveBeenCalled()
        })

        it('Should fail to return user object and respond with status code 400', async () => {
            const userIdToGet = '2'
            const expectedError = {
                error: 'Something went wrong!',
            }
            mockGetUserById.mockImplementationOnce(() => {
                throw new Error('Something went wrong!')
            })

            const response = await request.get(`/users/${userIdToGet}`)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expectedError)
            expect(mockGetUserById).toHaveBeenCalled()
        })
    })

    // describe('PATCH /users/:userId', () => {
    //     let updateUserInfoStub

    //     beforeAll(() => {
    //         updateUserInfoStub = sinon.stub(
    //             UserService.prototype,
    //             'updateUserInfo'
    //         )
    //     })

    //     afterEach(() => {
    //         updateUserInfoStub.reset()
    //     })

    //     it('Should update user info and return updated user object and respond with status code 200', (done) => {
    //         const userIdOfUserToUpdate = '2'
    //         const expectedResult = {
    //             id: '2',
    //             email: 'mary.jane@email.com',
    //             firstName: 'Mary',
    //             lastName: 'Jane Update',
    //         }
    //         const payload = {
    //             lastName: 'Jane Update',
    //         }
    //         updateUserInfoStub.returns(expectedResult)

    //         request
    //             .patch(`/users/${userIdOfUserToUpdate}`)
    //             .send(payload)
    //             .then((res) => {
    //                 const user = res.body
    //                 expect(res.status).toBe(200)
    //                 expect(updateUserInfoStub.calledOnce).toBeTruthy()
    //                 expect(user).toEqual(expectedResult)
    //                 expect(user.id).toBe(userIdOfUserToUpdate)
    //                 expect(user.email).toBeDefined()
    //                 expect(user.firstName).toBeDefined()
    //                 expect(user.lastName).toBeDefined()
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })

    //     it('Should return status code 404 if user is not found based on given userId in url params', (done) => {
    //         const userIdOfUserToUpdate = '2'
    //         const expectedResult = {
    //             error: 'User not found.',
    //         }
    //         const payload = {
    //             lastName: 'Jane Update',
    //         }
    //         updateUserInfoStub.returns(null)

    //         request
    //             .patch(`/users/${userIdOfUserToUpdate}`)
    //             .send(payload)
    //             .then((res) => {
    //                 expect(res.status).toBe(404)
    //                 expect(updateUserInfoStub.calledOnce).toBeTruthy()
    //                 expect(res.body).toEqual(expectedResult)
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })

    //     it('Should fail to return updated user object and respond with status code 404', (done) => {
    //         const userIdOfUserToUpdate = '2'
    //         const expectedResult = {
    //             error: 'Something went wrong!',
    //         }
    //         const payload = {
    //             lastName: 'Jane Update',
    //         }
    //         updateUserInfoStub.throws(() => new Error('Something went wrong!'))

    //         request
    //             .patch(`/users/${userIdOfUserToUpdate}`)
    //             .send(payload)
    //             .then((res) => {
    //                 expect(res.status).toBe(400)
    //                 expect(updateUserInfoStub.calledOnce).toBeTruthy()
    //                 expect(res.body).toEqual(expectedResult)
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })
    // })
})
