# REST API Micro-Service Starter

A light weight and yet comprehensive starter template for building REST API Microservices using Node.js and Express. Optimized for faster bootstraps and performance.

## Features

### Workflows

Supports

- API First Workflow
- Code First Workflow

### Environments/modes

- development (default)
- test
- integration and
- production

### Database Connectors

Support connecting to

- Oracle with [nodejs-oracle-connector](https://github.com/softrams/nodejs-oracle-connector), a wrapper around [node-oracledb](https://github.com/oracle/node-oracledb), Oracle's official nodejs library
- MySQL with [nodejs-mysql-connector](https://github.com/softrams/nodejs-mysql-connector), a wrapper around [mysqljs](https://github.com/mysqljs/mysql), pure javascript client for mySQL databases

### Open API 3.0

- Auto-generation of Swagger specification in development mode with [express-oas-generator](https://github.com/mpashkovskiy/express-oas-generator)
- Auto-generation of Swagger specification in test mode to generate full API [express-oas-generator](https://github.com/mpashkovskiy/express-oas-generator)
- Convert to Open API 3.0 with [api-spec-converter](https://github.com/LucyBot-Inc/api-spec-converter)
- Validation of requests/responses with Open API 3.0 specification in integration mode [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator)

### Application Security

#### Enhanced Logs

A log event of **APP-SEC-EVENT** type is logged to console on

- Failed authentication (invalid, expired or malformed token)
- Attempt to access secure route without token
- API Key ID Mis-match with information retrieved from token
- Invalid scopes in API Key
- Failure in RBAC Middleware for rolebased checks

#### Automated Checks

- Ensure validation middleware is attached with each secure route
- Check on ALL secure routes and ALL methods (GET, POST, PUT, PATCH and DELETE)
  - Missing Token
  - Malformed Token
  - Expired Token
- Check on ALL secure routes and GET method
  - Query parameters are validated
- Check on ALL secure routes and POST, PUT, PATCH and DELETE methods
  - Query parameters are validated
  - Body is validated
- Check that all validator schema definitions include
  - **query** to verify that query parameters are validated

#### Frozen Dependencies

On production builds, this template uses frozen dependencies to ensure, no unverified package versions are included.

- Uses frozen lock file
- Runs audit during installation

```bash
yarn --production --frozen-lockfile --audit
```

#### Audit Dependencies on pre-push commit

Audit is run during validation phase, on pre-push commit.

#### Validate requests/responses against API Specification

As part of integration tests, all API requests and responses are validated against OpenAPI 3.0 API specification.
Optionally, this can be enabled during 'development'.

### Pre-Push Hook to validate

- Pre-push hook configured with husky to run
  - unit tests
  - lint checks
  - audit checks

### Generic

- No transpilers, just vanilla javascript
- ES2017 latest features like Async/Await
- CORS enabled
- Uses [yarn](https://yarnpkg.com)
- Consistent coding styles with [editorconfig](http://editorconfig.org)
- [Docker](https://www.docker.com/) support
- Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Request validation with [joi](https://github.com/hapijs/joi) and [express-validation](https://github.com/andrewkeig/express-validation)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Linting with [eslint](http://eslint.org)
- Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
- Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
- Git hooks with [husky](https://github.com/typicode/husky)
- Monitoring with [pm2](https://github.com/Unitech/pm2)
- Performance Testing with [Artillery](https://github.com/artilleryio/artillery)

## Requirements

- [Node v10.x+](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker](https://www.docker.com/) for Docker containerized deployments
- [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html) to connect to Oracle database

## Getting Started

### Clone the repo

```bash
git clone --depth 1 https://github.com/softrams/node-api-svc-starter
cd node-api-svc-stater
rm -rf .git
```

### Install dependencies:

```bash
yarn
```

### Folder Structure

```
|── .vscode
|── docs
│   ├── v1
│   │   ├── api.yaml
│   │   ├── predefined_spec.json
│   │   └── swagger.json
|── keys
│   ├── public.pem
│   └── private.pem
├── src
│   ├── api
│   │   ├── public
│   │   │   ├── core
│   │   │   │   ├── core.controller.js
│   │   │   │   ├── core.controller.test.js
│   │   │   │   ├── core.routes.js
│   │   │   │   ├── core.service.js
│   │   │   │   └── README.md
│   │   │   ├── public.routes.js
│   │   │   └── README.md
│   │   ├── secure
│   │   │   ├── feature
│   │   │   │   ├── feature.controller.js
│   │   │   │   ├── feature.controller.test.js
│   │   │   │   ├── feature.controller.integration-test.js
│   │   │   │   ├── feature.schema.validators.js
│   │   │   │   ├── feature.service.js
│   │   │   │   ├── feature.service.queries.js
│   │   │   │   └── README.md
│   │   │   ├── secure.routes.js
│   │   │   ├── secure.routes.test.js
│   │   │   └── README.md
│   │   ├── shared
│   │   │   ├── middleware
│   │   │   │   ├── auth.middleware.js
│   │   │   │   ├── error.middleware.js
│   │   │   │   └── README.md
│   │   │   ├── services
│   │   │   │   └── README.md
│   │   │   ├── utils
│   │   │   │   ├── APIError.js
│   │   │   │   ├── AppRoutes.js
│   │   │   │   ├── JWTGenerator.js
│   │   │   │   └── README.md
│   │   │   └── utils
│   │   │       └── validators.test.js
│   │   └── README.md
│   ├── config
│   │   ├── express.config.js
│   │   ├── validator.config.js
│   │   ├── vars.config.js
│   │   └── README.md
│   ├── tests
│   │   ├── appsec
│   │   │   └── README.md
│   │   ├── perf
│   │   │   ├── auth_helper.js
│   │   │   ├── basic.json
│   │   │   ├── basic.yaml
│   │   │   └── README.md
│   └── index.js
├── .dockerignore
├── .editorconfig
├── .eslintrc
├── .gitattributes
├── .gitignore
├── .prettierrc
├── Dockerfile
├── package.json
├── README.md
└── yarn.lock
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run unit tests with Mocha
yarn test

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

```

## Validate

```bash
# run lint and tests (do not include integration tests)
yarn validate
```

## Docker

```bash
docker build --tag softrams-node-api-starter:1.0 .
docker run --publish 3100:3100 --detach --name srtest softrams-node-api-starter:1.0

# Delete container once testing is complete
docker rm --force srtest
```

## API Documentation in Swagger and OpenAPI 3.0

Generate Swagger Documentation is stored in ./docs/v1/swagger.json in OpenAPI v2.0 (Swagger). This version can be converted and stored in ./docs/v1/api.yaml.

```bash
# Generate up-to-date API Specification in OpenAPI 2.0 Version
yarn test

# Convert to OpenAPI 3.0 Version
yarn gen-openapi-v3
```

### Live Swagger UI

```bash
# LIVE api documentation
open http://localhost:3100/api-docs

# LIVE api specification
open http://localhost:3100/api-spec
```
