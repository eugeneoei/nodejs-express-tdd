# NodeJS Express TDD

A TDD exercise on NodeJS with Express and MongoDB(?).

Folder structure is as follows:

- Controllers: responsible for accepting requests, calls respective service and provide a response
- Middlewares: executes checks and validation such as authentication, authorisation, valid input values
- Services: calls one or multiple repositories and emits events
- Repositories: calls one object entity (model) only
- Models: database schema

# Objectives

- Implement unit test for each of the above service in isolation, mocking dependencies as required.
- Implement integration test for each API endpoint with test database (?)

# Test Libraries

- `jestjs`
- `sinon` to create stubs for expected results in each individual test for isolation
- `supertest` to make request to `Express`

# Resources

- [How to unit test express routes](https://www.marclittlemore.com/how-to-unit-test-express-routes/)
- [How To Test Your Express Controllers](https://www.terlici.com/2015/09/21/node-express-controller-testing.html)
- [Unit Testing Express Routers](https://evanshortiss.com/express-testing-using-ioc)
- [`spies` vs `stubs` vs `mocks`](https://stackoverflow.com/questions/67541030/mocking-with-sinon-against-a-service-module)
- [How to mock es6 class](https://medium.com/@madhanganesh/how-to-mock-es6-class-749da63268fc)
- [`sinonjs` and `jestjs` cheatsheet](https://github.com/maurocarrero/sinon-jest-cheatsheet)
- []()
- []()
- []()
- []()
- []()

