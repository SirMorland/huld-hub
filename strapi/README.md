Strapi with docker
## Table Of Content
- [Table Of Content](#table-of-content)
- [Getting started](#getting-started)
- [docker-compose.override.yml](#docker-composeoverrideyml)
  - [PORT](#port)
  - [ADMIN_JWT_SECRET](#admin_jwt_secret)
- [Documentation](#documentation)
  - [Authentication endpoint](#authentication-endpoint)
- [FAQ](#faq)
  - [Cannot find module](#cannot-find-module)
## Getting started
- Copy `docker-compose.override-example.yml` to `docker-compose.override.yml` and edit the file. 
- Run `docker-compose up` to start Strapi server. Docker will need to build the container if it's the first time you run it.
- By default, the strapi endpoint will be at http://localhost:443

## docker-compose.override.yml
- Reference https://docs.docker.com/compose/extends/
- TLDR: used to override the docker-compose with your own config (e.g. environment variables or ports) for your local

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

Once the docker container is up, you can access the documentation from http://localhost:443/documentation

### Authentication endpoint

This can be checked from `UsersPermissions - User` > `POST - /auth/local`.

Taken from the official [documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login).

>Submit the user's identifier and password credentials for authentication. When the authentication is successful, the response data returned will have the user's information along with a jwt authentication token.
>
>The identifier param can either be an email or a username.
>```
>import axios from 'axios';
>
>// Request API.
>axios
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
>```
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
  docker-compose down --volume; 
  docker-compose build strapi; 
  docker-compose up
```