const sinon = require('sinon')

const UserRepository = require('../../repositories/user.repository')
const User = require('../../models/user.model')

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
        let userModelSaveStub

        beforeAll(() => {
            console.log(User.prototype.save)
            userModelSaveStub = sinon.stub(User.prototype, 'save')
        })

        afterEach(() => {
            userModelSaveStub.reset()
        })

        it('Should return new user object when called with email, firstName, lastName and password', () => {
            const payload = {
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
                password: 'password1',
            }
            const expectedResult = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            userModelSaveStub.returns(expectedResult)

            const response = userRepository.createUser(
                payload.email,
                payload.firstName,
                payload.lastName,
                payload.password
            )

            expect(response).toEqual(expectedResult)
            expect(userModelSaveStub.calledOnce).toBe(true)
        })
    })

    describe('getUserByEmail method', () => {
        let userModelFindOneStub

        beforeAll(() => {
            userModelFindOneStub = sinon.stub(User, 'findOne')
        })

        afterEach(() => {
            userModelFindOneStub.reset()
        })

        it('Should return user that matches given email string', () => {
            const payload = 'jon.doe@email.com'
            const expectedResult = {
                _id: '1',
                email: 'jon.doe@email.com',
                firstName: 'Jon',
                lastName: 'Doe',
            }
            userModelFindOneStub.returns(expectedResult)

            const response = userRepository.getUserByEmail(payload)

            expect(response).toBe(expectedResult)
        })
    })
})
