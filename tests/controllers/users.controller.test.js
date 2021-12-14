const sinon = require('sinon')
const supertest = require('supertest')

const app = require('../mocks/express.mock')
const usersController = require('../../controllers/users.controller')
const UserService = require('../../services/user.service')
const usersStub = require('./stubs/users.stub')

describe('Users Controller', () => {
    let request

    beforeAll(() => {
        usersController(app)
        request = supertest(app)
    })

    describe('POST /users', () => {
        let createUserStub

        beforeAll(() => {
            createUserStub = sinon.stub(UserService.prototype, 'createUser')
        })

        afterEach(() => {
            createUserStub.reset()
        })

        it('Should create a user and respond with status code 201 and user object', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedResult = {
                id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            createUserStub.returns(expectedResult)

            request
                .post('/users')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(201)
                    expect(res.body).toEqual(expectedResult)
                    expect(
                        createUserStub.calledOnceWithExactly(
                            payload.email,
                            payload.firstName,
                            payload.lastName,
                            payload.password
                        )
                    ).toBe(true)
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to create a user and respond with status code 400', (done) => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
                confirmPassword: 'password1',
            }
            const expectedResult = {
                Error: 'Something went wrong!',
            }
            createUserStub.throws(() => new Error('Something went wrong!'))

            request
                .post('/users')
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('GET /users', () => {
        let getAllUsersStub

        beforeAll(() => {
            getAllUsersStub = sinon.stub(UserService.prototype, 'getAllUsers')
        })

        afterEach(() => {
            getAllUsersStub.reset()
        })

        it('Should return all users and respond with status code 200', (done) => {
            const expectedResult = usersStub
            const expectedProperties = Object.keys(usersStub[0])
            getAllUsersStub.returns(usersStub)

            request
                .get('/users')
                .then((res) => {
                    const users = res.body
                    expect(res.status).toBe(200)
                    expect(getAllUsersStub.calledOnce).toBeTruthy()
                    expect(users).toEqual(expectedResult)
                    expect(users).toHaveLength(expectedResult.length)
                    users.forEach((user) => {
                        expect(Object.keys(user)).toEqual(expectedProperties)
                    })
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to return all users and respond with status code 400', (done) => {
            const expectedResult = {
                Error: 'Something went wrong!',
            }
            getAllUsersStub.throws(() => new Error('Something went wrong!'))

            request
                .get('/users')
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('GET /users/:userId', () => {
        let getUserByIdStub

        beforeAll(() => {
            getUserByIdStub = sinon.stub(UserService.prototype, 'getUserById')
        })

        afterEach(() => {
            getUserByIdStub.reset()
        })

        it('Should return a user object that matches given id in url params and respond with status code 200', (done) => {
            const expectedResult = {
                id: '2',
                email: 'mary.jane@email.com',
                firstName: 'Mary',
                lastName: 'Jane',
            }
            const userIdToGet = '2'
            getUserByIdStub.returns(expectedResult)

            request
                .get(`/users/${userIdToGet}`)
                .then((res) => {
                    const user = res.body
                    expect(res.status).toBe(200)
                    expect(getUserByIdStub.calledOnce).toBeTruthy()
                    expect(user).toEqual(expectedResult)
                    expect(user.id).toBe(userIdToGet)
                    expect(user.email).toBeDefined()
                    expect(user.firstName).toBeDefined()
                    expect(user.lastName).toBeDefined()
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should return status code 404 if user is not found based on given userId in url params', (done) => {
            const userIdToGet = '2'
            const expectedResult = {
                error: 'User not found.',
            }
            getUserByIdStub.returns(null)

            request
                .get(`/users/${userIdToGet}`)
                .then((res) => {
                    expect(res.status).toBe(404)
                    expect(getUserByIdStub.calledOnce).toBeTruthy()
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to return user object and respond with status code 404', (done) => {
            const userIdToGet = '2'
            const expectedResult = {
                Error: 'Something went wrong!',
            }
            getUserByIdStub.throws(() => new Error('Something went wrong!'))

            request
                .get(`/users/${userIdToGet}`)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(getUserByIdStub.calledOnce).toBeTruthy()
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })

    describe('PATCH /users/:userId', () => {
        let updateUserInfoStub

        beforeAll(() => {
            updateUserInfoStub = sinon.stub(
                UserService.prototype,
                'updateUserInfo'
            )
        })

        afterEach(() => {
            updateUserInfoStub.reset()
        })

        it('Should update user info and return updated user object and respond with status code 200', (done) => {
            const userIdOfUserToUpdate = '2'
            const expectedResult = {
                id: '2',
                email: 'mary.jane@email.com',
                firstName: 'Mary',
                lastName: 'Jane Update',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            updateUserInfoStub.returns(expectedResult)

            request
                .patch(`/users/${userIdOfUserToUpdate}`)
                .send(payload)
                .then((res) => {
                    const user = res.body
                    expect(res.status).toBe(200)
                    expect(updateUserInfoStub.calledOnce).toBeTruthy()
                    expect(user).toEqual(expectedResult)
                    expect(user.id).toBe(userIdOfUserToUpdate)
                    expect(user.email).toBeDefined()
                    expect(user.firstName).toBeDefined()
                    expect(user.lastName).toBeDefined()
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should return status code 404 if user is not found based on given userId in url params', (done) => {
            const userIdOfUserToUpdate = '2'
            const expectedResult = {
                error: 'User not found.',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            updateUserInfoStub.returns(null)

            request
                .patch(`/users/${userIdOfUserToUpdate}`)
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(404)
                    expect(updateUserInfoStub.calledOnce).toBeTruthy()
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })

        it('Should fail to return updated user object and respond with status code 404', (done) => {
            const userIdOfUserToUpdate = '2'
            const expectedResult = {
                Error: 'Something went wrong!',
            }
            const payload = {
                lastName: 'Jane Update',
            }
            updateUserInfoStub.throws(() => new Error('Something went wrong!'))

            request
                .patch(`/users/${userIdOfUserToUpdate}`)
                .send(payload)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(updateUserInfoStub.calledOnce).toBeTruthy()
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })
})

// const sinon = require('sinon')
// const supertest = require('supertest')

// const app = require('../mocks/express.mock')
// const UserService = require('../../services/users.service')
// const usersController = require('../../controllers/users.controller')

// describe('Users Controller', () => {
//     let request, createUserStub,UserServiceSub

//     beforeAll(() => {
//         // const UserServiceSub = new UserService()
//         // createUserStub = sinon.stub(UserServiceSub, 'createUser')

//         UserServiceSub = sinon.createStubInstance(UserService)

//         usersController(app)
//         request = supertest(app)
//     })

//     describe('POST /users', () => {
//         it('Should create a user and respond with status code 201 and user object', (done) => {
//             const payload = {
//                 email: 'jon.doe@email.com',
//                 firstName: 'Jon',
//                 lastName: 'Doe',
//                 password: 'password1',
//                 confirmPassword: 'password1',
//             }
//             const expectedResult = {
//                 id: 1,
//                 email: 'jon.doe@email.com',
//                 firstName: 'Jon',
//                 lastName: 'Doe',
//             }
//             // createUserStub.returns(expectedResult)
//             UserServiceSub.createUser.returns(expectedResult)

//             request
//                 .post('/users')
//                 .send(payload)
//                 .then((res) => {
//                     expect(res.status).toBe(201)
//                     expect(res.body).toEqual(expectedResult)
//                     done()
//                 })
//                 .catch((err) => done(err))
//         })
//     })
// })
