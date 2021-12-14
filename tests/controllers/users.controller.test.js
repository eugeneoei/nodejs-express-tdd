const sinon = require('sinon')
const supertest = require('supertest')

const app = require('../mocks/express.mock')
const usersController = require('../../controllers/users.controller')
const UserService = require('../../services/user.service')

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
                id: 1,
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
                    expect(createUserStub.calledOnceWithExactly(
                        payload.email,
                        payload.firstName,
                        payload.lastName,
                        payload.password
                    )).toBe(true)
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
