# Nest Authentication and Authorization Example

This is an example for implementing authentication and authorization in [NextJS](https://nestjs.com) framework with [MongoDB](https://www.mongodb.com/) as database. Switch to postgres branch for PostgreSQL example.

## Description

Passport authentication library has been used to handle authentication. It's straightforward to integrate this library with a Nest application using the [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport) module. Here we will use [Mongoose](https://www.npmjs.com/package/@nestjs/mongoose) object modeling tool to simplify the database intreactions with MongoDB.

  * Authenticate a user by verifying their "credentials"(email/password or username/password, JWT)
  * Local Strategy and Jwt Strategy.
  * Manage authenticated state by issuing a portable token, such as a JWT.
  * Attach information about the authenticated user to the Request object for further use in route handlers
  * Custom decorators for making the routes public and to get user data.

## Installation

Use the package manager [NPM](https://www.npmjs.com) to install.

```bash
npm i
```

## Running the app

Make sure you have defined the environmental variables(Mongo URI, Jwt Secret) in the env file.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Nest is [MIT licensed](LICENSE).
