const mockGetAllUsers = jest.fn()
const mockGetUserById = jest.fn()
const mockUpdateUserInfo = jest.fn()
const mockUserService = jest.fn().mockImplementation(() => ({
    getAllUsers: mockGetAllUsers,
    getUserById: mockGetUserById,
    updateUserInfo: mockUpdateUserInfo,
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
        })
    })

    describe('PATCH /users/:userId', () => {
        it('Should return updated user object and respond with status code 200', async () => {
            const idOfUserToUpdate = '2'
            const expectedUser = {
                id: '2',
                email: 'mary.jane@email.com',
                firstName: 'Mary',
                lastName: 'Jane Update',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            mockUpdateUserInfo.mockImplementationOnce(() => expectedUser)

            const response = await request
                .patch(`/users/${idOfUserToUpdate}`)
                .send(payload)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(expectedUser)
        })

        it('Should return status code 404 if user is not found based on given userId in url params', async () => {
            const idOfUserToUpdate = '2'
            const expectedError = {
                error: 'User not found.',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            mockUpdateUserInfo.mockImplementationOnce(() => null)

            const response = await request
                .patch(`/users/${idOfUserToUpdate}`)
                .send(payload)

            expect(response.status).toBe(404)
            expect(response.body).toEqual(expectedError)
        })

        it('Should fail to return updated user object and respond with status code 404', async () => {
            const idOfUserToUpdate = '2'
            const expectedError = {
                error: 'Something went wrong!',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            mockUpdateUserInfo.mockImplementationOnce(() => {
                throw new Error('Something went wrong!')
            })

            const response = await request
                .patch(`/users/${idOfUserToUpdate}`)
                .send(payload)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expectedError)
        })
    })
})
