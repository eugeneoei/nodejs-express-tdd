var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')

var express = require('express')

describe('Users Controller', () => {
    let app, request, createUserStub, route

    beforeAll(() => {
        createUserStub = sinon.stub()
        app = express()
        route = proxyquire('../../controllers/users-controller', {
            '../services/user-service.js': {
                createUser: createUserStub,
            },
        })
        route(app)
        request = supertest(app)
    })

    describe('POST /users', () => {
        it('Should create a user and respond with status code 201 and user object', (done) => {
            const input = {
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
                .send(input)
                .expect('Content-Type', /json/)
                .expect(201)
                .then((res) => {
                    expect(res.body).toEqual(expectedResult)
                    done()
                })
                .catch((err) => done(err))
        })
    })
})
