# NodeJS Express TDD

A TDD exercise on NodeJS with Express and MongoDB(?).

Folder structure is as follows:

- Controllers
- Middlewares
- Services
- Repositories
- Models

# Objectives

- Implement unit test for each of the above service in isolation, mocking dependencies as required.
- Implement integration test for each API endpoint with test database (?)

# Test Libraries

- `jestjs`
- `proxyquire` as a replacement for `require` statement and maps `require` calls within each module
- `sinon` to create stubs for expected results in each individual test for isolation
- `supertest` to make request to `Express`

# Resources

- [How to unit test express routes](https://www.marclittlemore.com/how-to-unit-test-express-routes/)
- [How To Test Your Express Controllers](https://www.terlici.com/2015/09/21/node-express-controller-testing.html)
- [Unit Testing Express Routers](https://evanshortiss.com/express-testing-using-ioc)
- []()