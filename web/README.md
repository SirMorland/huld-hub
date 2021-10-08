## Table Of Content

- [Table Of Content](#table-of-content)
- [Getting started](#getting-started)
  - [Setup development environment](#setup-development-environment)
  - [Setup production environment](#setup-production-environment)

## Getting started

### Setup development environment
To start the development environment:
1. Copy `docker-compose.dev.yml` to `docker-compose.override.yml`. The `docker-compose.override.yml` file can be further edited if needed.
2. Run `docker-compose up` to start the frontend in development mode. Docker will need to build the container if it's the first time you run it.
3. The frontend runs on http://localhost:3000 by default.


### Setup production environment
To start the production environment:
1. Copy `docker-compose.prod.yml` to `docker-compose.override.yml`. The `docker-compose.override.yml` file can be further edited if needed.
2. Run `docker-compose up` to start the frontend in production mode. Docker will need to build the container if it's the first time you run it.
3. The frontend runs on http://localhost:80 by default.