const UserModel = require('../../models/user.model')

describe('User Model', () => {
    it('Should return email, firstName, lastName and password errors if any of these are empty', (done) => {
        const newUser = new UserModel()

        newUser.validate((err) => {
            expect(err.errors.email).toBeDefined()
            expect(err.errors.firstName).toBeDefined()
            expect(err.errors.lastName).toBeDefined()
            expect(err.errors.password).toBeDefined()
            done()
        })
    })

    it('Should return email error if given email is not a valid email', (done) => {
        const payload = {
            email: 'jon.doe.com',
            firstName: 'Jon',
            lastName: 'Doe',
            password: 'password1',
        }

        const newUser = new UserModel(payload)

        newUser.validate((err) => {
            expect(err.errors.email).toBeDefined()
            done()
        })
    })

    it('Should not return email error if given email is a valid email', (done) => {
        const payload = {
            email: 'jon.doe@email.com'
        }

        const newUser = new UserModel(payload)

        newUser.validate((err) => {
            expect(err.errors.email).not.toBeDefined()
            done()
        })
    })

    // Question: a test case that covers unique email field should be added. but where should this test be?
})
