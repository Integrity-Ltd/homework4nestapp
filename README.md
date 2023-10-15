## Description

[Nest](https://github.com/nestjs/nest) framework test app.

## Installation

Make sure you have a PostreSQL server on localhost.
Make a ```todos``` database.

```bash
$ cp example.env .env
# edit .env file and set database and security enviroment variables
$ npm install
$ npx prisma migrate dev --name init
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
