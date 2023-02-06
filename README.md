# Athena Backend

This is the codebase for Athena's backend. This is built with [NestJS](https://docs.nestjs.com/), [Prisma](https://www.prisma.io/docs), and [PostgreSQL](https://www.postgresql.org/docs/).

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

# Start Docker after updating any dependencies
$ npm run dev:update

# Same as above but detached
$ npm run dev:update-d

# Start Docker after updating the Dockerfile or docker-compose.yaml
$ npm run dev:build

# Same as above but detached
$ npm run dev:build-d

# Start Docker after updating any dependencies and the Dockerfile or docker-compose.yaml
$ npm run dev:update-b

# Same as above but detached
$ npm run dev:update-b-d

```

## Updating the Database Schema

When you make any changes to the [Prisma Schema](./src/database/schema.prisma), you must update the database to reflect the changes.

Before running the following commands, make sure the containers are not running. You can make sure that is the case by running `docker-compose down`.

```bash
# Only start the postgres container
$ docker-compose start postgres

# Run the prisma migrate command so that it updates the database
# Note: You should run this command in the terminal on your local machine, not in the docker instance
$ npx prisma migrate dev --name <name for the migration>
# E.g. npx prisma migrate dev --name added_email_to_users
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

## LICENSE

This project is licensed by [GNU AGPL v3.0](LICENSE).
