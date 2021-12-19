const mockGetAllUsers = jest.fn()
const mockUserService = jest.fn().mockImplementation(() => ({
    getAllUsers: mockGetAllUsers,
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
        it('Should return all users and respond with status code 200', async () => {
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

        it('Should fail to return all users and respond with status code 400', async () => {
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

    // describe('GET /users/:userId', () => {
    //     let getUserByIdStub

    //     beforeAll(() => {
    //         getUserByIdStub = sinon.stub(UserService.prototype, 'getUserById')
    //     })

    //     afterEach(() => {
    //         getUserByIdStub.reset()
    //     })

    //     it('Should return a user object that matches given id in url params and respond with status code 200', (done) => {
    //         const expectedResult = {
    //             id: '2',
    //             email: 'mary.jane@email.com',
    //             firstName: 'Mary',
    //             lastName: 'Jane',
    //         }
    //         const userIdToGet = '2'
    //         getUserByIdStub.returns(expectedResult)

    //         request
    //             .get(`/users/${userIdToGet}`)
    //             .then((res) => {
    //                 const user = res.body
    //                 expect(res.status).toBe(200)
    //                 expect(getUserByIdStub.calledOnce).toBeTruthy()
    //                 expect(user).toEqual(expectedResult)
    //                 expect(user.id).toBe(userIdToGet)
    //                 expect(user.email).toBeDefined()
    //                 expect(user.firstName).toBeDefined()
    //                 expect(user.lastName).toBeDefined()
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })

    //     it('Should return status code 404 if user is not found based on given userId in url params', (done) => {
    //         const userIdToGet = '2'
    //         const expectedResult = {
    //             error: 'User not found.',
    //         }
    //         getUserByIdStub.returns(null)

    //         request
    //             .get(`/users/${userIdToGet}`)
    //             .then((res) => {
    //                 expect(res.status).toBe(404)
    //                 expect(getUserByIdStub.calledOnce).toBeTruthy()
    //                 expect(res.body).toEqual(expectedResult)
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })

    //     it('Should fail to return user object and respond with status code 404', (done) => {
    //         const userIdToGet = '2'
    //         const expectedResult = {
    //             error: 'Something went wrong!',
    //         }
    //         getUserByIdStub.throws(() => new Error('Something went wrong!'))

    //         request
    //             .get(`/users/${userIdToGet}`)
    //             .then((res) => {
    //                 expect(res.status).toBe(400)
    //                 expect(getUserByIdStub.calledOnce).toBeTruthy()
    //                 expect(res.body).toEqual(expectedResult)
    //                 done()
    //             })
    //             .catch((err) => done(err))
    //     })
    // })

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
