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
})
