Strapi with docker

## Table Of Content

- [Table Of Content](#table-of-content)
- [Getting started](#getting-started)
- [docker-compose.override.yml](#docker-composeoverrideyml)
- [Create a db dump for frontend devs](#create-a-db-dump-for-frontend-devs)
- [Import mysql dump to Strapi backend](#import-mysql-dump-to-strapi-backend)
  - [PORT](#port)
  - [ADMIN_JWT_SECRET](#admin_jwt_secret)
- [Documentation](#documentation)
  - [Authentication endpoint](#authentication-endpoint)
- [Bootstrap scripts](#bootstrap-scripts)
  - [Role setup](#role-setup)
  - [User setup](#user-setup)
- [FAQ](#faq)
  - [Cannot find module](#cannot-find-module)

## Getting started

- Copy `docker-compose.dev.yml` to `docker-compose.override.yml` to setup development environment. The `docker-compose.override.yml` file can be further edited if needed.
- Create an `app/.env` file and copy [app/.env.example](./app/.env.example) to it providing the required values
- Run `docker-compose up` to start Strapi server in development mode. Docker will need to build the container if it's the first time you run it.
- Database dumps in `/mysql-dump` will be imported when you run `docker-compose up` the first time
- By default, the strapi endpoint will be at http://localhost:1337
- Run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d` to start Strapi server in production mode. Docker will need to build the container if it's the first time you run it.

## docker-compose.override.yml

- Reference https://docs.docker.com/compose/extends/
- TLDR: used to override the docker-compose with your own config (e.g. environment variables or ports) for your local

## Create a db dump for frontend devs

- Make sure `mysql` container is up and running
- Run `docker ps` to get the container ID of the mysql `container`:
```bash
docker ps                        
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS         PORTS                                       NAMES
2b8f793f9429   strapi/strapi   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:1337->1337/tcp, :::1337->1337/tcp   huldhub_backend
ca35896ea2b7   mysql           "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   3306/tcp, 33060/tcp                         huldhub_database
```
- Run `docker exec ${MSQYL_CONTAINER_ID} /usr/bin/mysqldump -u root --password=strapi strapi > ./mysql-dump/backup.sql`. For example:
```bash
docker exec ca35896ea2b7 /usr/bin/mysqldump -u root --password=strapi strapi > ./mysql-dump/backup.sql
```
- the mysql dump will be applied to the mysql container after a fresh build of docker-compose.

## Import mysql dump to Strapi backend

- Make sure `mysql` container is up and running
- Run `docker ps` to get the container ID of the `mysql` container:
``` 
docker ps                                                                             
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS          PORTS                                       NAMES
d01eba674238   strapi/strapi   "docker-entrypoint.s…"   2 minutes ago   Up 59 seconds   0.0.0.0:1337->1337/tcp, :::1337->1337/tcp   huldhub_backend
ddbb6159e544   mysql           "docker-entrypoint.s…"   2 minutes ago   Up 59 seconds   3306/tcp, 33060/tcp                         huldhub_database
```
- Run `docker exec -i ${MYSQL_CONTAINER_ID}  mysql -uroot -pstrapi strapi < ./mysql-dump/backup.sql`. For example:
```bash
docker exec ddbb6159e544 /usr/bin/mysqldump -u root --password=strapi strapi > ./mysql-dump/backup.sql
```
- the mysql dump will be applied to the mysql container immediately.

### PORT

```bash
ERROR: for strapi  Cannot start service strapi: driver failed programming external connectivity on endpoint strapi_strapi_1 (fac123aad08da1f0c4132cb3e041ab0e86092672d7b65e7b6133fb232836cba0): Bind for 0.0.0.0:80 failed: port is already allocated
```

You don't want to use http://localhost:443 as the backend endpoint, and you want to use another one such as `1234`.
In `docker-compose.override.yml`, you can change all occurencens of 80 to another one:

```yml
services:
  strapi:
    environment:
      # strapi port
      PORT: 1234
      ...
    ports:
      # local port gets exposed to the container port
      - '1234:1234'
```

Or simply the part on the right side of the `:`, `{your-port}:80`, like so:

```yml
services:
  strapi:
    environment:
      # strapi port
      PORT: 443
      ...
    ports:
      # local port gets exposed to the container port
      - '443:1234'
```

### ADMIN_JWT_SECRET

1. Generate a secure token

```bash
openssl rand 64 | base64 # (linux/macOS users)
# or
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))" # (all users)
```

For example:

```bash
openssl rand 64 | base64
V3z2kvxM8mRca9tDE7zLo9TpoiFaVSXbHq2vRYsWBCyuDt0n/CX+ek/SIXlORX7WtJ0sBhdY+E22IIFp8Y/XXQ==
```

2. Copy and paste the value to `ADMIN_JWT_SECRET`:

```yml
ADMIN_JWT_SECRET: V3z2kvxM8mRca9tDE7zLo9TpoiFaVSXbHq2vRYsWBCyuDt0n/CX+ek/SIXlORX7WtJ0sBhdY+E22IIFp8Y/XXQ==
```

## Documentation

Once the docker container is up, you can access the documentation from http://localhost:1337/documentation

### Authentication endpoint

This can be checked from `UsersPermissions - User` > `POST - /auth/local`.

Taken from the official [documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login).

> Submit the user's identifier and password credentials for authentication. When the authentication is successful, the response data returned will have the user's information along with a jwt authentication token.
>
> The identifier param can either be an email or a username.
>
> ```
> import axios from 'axios';
>
> // Request API.
> axios
>  .post('http://localhost:1337/auth/local', {
>    identifier: 'user@strapi.io',
>    password: 'strapiPassword',
>  })
>  .then(response => {
>    // Handle success.
>    console.log('Well done!');
>    console.log('User profile', response.data.user);
>    console.log('User token', response.data.jwt);
>  })
>  .catch(error => {
>    // Handle error.
>    console.log('An error occurred:', error.response);
>  });
>
> ```

## Bootstrap scripts
In development, these will be added on server-startup:
### Role setup
Read more in [./app/config/functions/roleSetup.js](./app/config/functions/roleSetup.js)
- add `admin` and `employee` roles if they don't exist
- The roles would have access to all application permissions

The module aslo exports these utilities: 
- `findRoleByName` (returns a role based on the role's name), 
- `createRole` (creates a role), 
- `ADMIN`, `EMPLOYEE` (constants for saving admin and employee roles' names)
### User setup
Read more in [./app/config/functions/userSetup.js](./app/config/functions/userSetup.js)
- add an `admin` role user with `huld-admin` as username and password if it doesn't exists
- add an `employee` role user with `huld-employee` as username and password if it doesn't exists
- 
The module aslo exports these utilities: 
- `findUserByUsername` (returns a user based on the user's username),
- createUser (creates a user),
- `EMPLOYEE_CREDENTIAL` and `ADMIN_CREDENTIAL` (constants for saving the admin and employee users credentials - both username and password)
## FAQ

### Cannot find module

This happens because the docker container's `node_modules` aren't updated accordingly to the `package.json`. This is because `package.json` has changed from the last time that the container gets built.

```
strapi_1  | debug ⛔️ Server wasn't able to start properly.
strapi_1  | error Error: Cannot find module 'strapi-plugin-documentation/package.json'
```

To resolve this we have to remove the container's volume and build it again. Here's an example of how you can do it:

```
  docker-compose down;
  docker-compose down --volumes;
  docker-compose build strapi;
  docker-compose up
```
