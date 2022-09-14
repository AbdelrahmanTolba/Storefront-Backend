# Storefront Backend Project
> This project is part of the Udacity Backend Javascript Nanodegree

### Build with

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [postgresql](https://www.postgresql.org/)
- [JWT](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jasmine](https://jasmine.github.io/)

# Getting Started
 
Create ```.env``` file in the root directory
```sh
    PORT=3000
    ENV=dev

    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_USER=storefront_user
    POSTGRES_DB=storefront_db
    POSTGRES_DB_TEST=storefront_db_test
    POSTGRES_PASSWORD=password123
    
    BCRYPT_PASSWORD=breaking-bad-1234
    SALT_ROUNDS=10
    TOKEN_SECRET=hello-from-token-secret
 ```

# Setup
> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructuins.

### Scripts

**_Prettier_**

```sh
  npm run prettier
```

**_Lint_**

```sh
  npm run lint
```

**_Start server_**

```sh
  npm run start
```

**_Start server & tests_**

```sh
  npm run test
```

### Run Locally

1. **_Clone the repository_**

```sh
$ git clone [https://github.com/AbdelrahmanTolba/Storefront-Backend.git]
```

2. **_Navigate to repository directory_**

```sh
$ cd Storefront-Backend
```

3. **_Install dependencies_**

```sh
$ npm install
```

4. **_Create 2 databases_**

```sh
CREATE DATABASE storefront_db;
CREATE DATABSE  storefront_db_test; 
```

5. **_Running on development mode_**

```sh
$ npm run start
```

6. **_Running Tests_**

```sh
$ npm run test
```
