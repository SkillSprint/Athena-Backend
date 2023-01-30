# Reperio Backend

This is the codebase for Reperio's backend. This is built with [NestJS](https://docs.nestjs.com/), [Prisma](https://www.prisma.io/docs), and [PostgreSQL](https://www.postgresql.org/docs/).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Start Docker containers for PostgreSQL and NestJS
$ npm run dev

# Same as above but detached
$ npm run dev:d

# Start Docker after updating any dependencies or the Dockerfile
$ npm run dev:update

# Same as above but detached
$ npm run dev:update-d
```

## Test

### Note: Have yet to check if the following works with Docker

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
