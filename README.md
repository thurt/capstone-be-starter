# Capstone Backend Starter Repo

## Architecture Overview

This HTTP API server uses JSON for requests/responses and includes starter endpoints for creating a user, logging in, and logging out. It uses JWTs for user authentication and mongoose for modelling objects in a mongodb database. Endpoint behaviors are implemented within controllers, and request/response payloads are automatically validated according to their respective schemas in the OpenApi specification. A usable documentation page of the OpenApi specification is provided by Swagger-UI.

User Model - This object model is setup to include `username`, `password`, `createdAt`, `updatedAt`. The `password` is hashed by bcrypt when it is created or updated in the database. The `password` is also never returned in JSON responses to the client. These are standard security practices for handling passwords. The User object model does not contain an `id`, instead, the `username` must be unique so it serves as the unique id for the user.

Responses - All endpoints are setup to follow an openapi response schema which includes a `statusCode`. In the case of error responses (status code >= 400 & < 500), the response will also include a `message`, which is a client-friendly message string that describes why the request failed. In the case of an unkown error (status code >=500), the server will respond with a generic error message (usually this `message` is `"Internal Server Error"`). This is a standard security practice to hide any internal stack traces or bug details in order to reduce the chance of client's figuring out how to exploit vulnerabilites. Unknown error details are still logged to the console, but there is also automatic logging of these errors into a file, `./unknown_errors.log`, which can be investigated in more detail when an unknown error occurs.

OpenApi Specification - this specification language is used to document available endpoints and their request/response schemas. You can find guides about how to write new endpoint details [here](https://swagger.io/docs/specification/about/). The full OpenApi specification language is described [here](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md).

### Dependencies

- **express**: nodejs framework for building web applications
- **mongoose**: mongodb object modelling for nodejs
- **passport, passport-jwt, jsonwebtoken**: packages for handling creation and validation of json web tokens
- **openapi-enforcer, openapi-enforcer-middleware**: packages for validating openapi schemas and enforcing schemas on api requests and responses for express endpoints
- **swagger-ui-express, yamljs**: packages for displaying openapi documentation page
- **bcrypt**: package for hashing passwords and validating passwords
- **statuses**: package contains standard HTTP messages for HTTP status codes
- **morgan**: package for logging incoming requests
- **dotenv-safe**: package for loading environment variables from a .env file
- **cors**: package for allowing cross origin requests to express api endpoints

### Top-Level Directories

- **auth/**: creates passport authentication strategy for JWTs and exports a validation middleware that can be used in `controllers/` to add validation requirement on any endpoint.
- **controllers/**: contains files named around API entities. Each file contains controller functions which is code that will be run for an endpoint.
- **models/**: contains mongoose models which are used by controller functions to get their work done.
- **swaggerDocsRouter/**: creates an express router that defines api endpoints for serving the swagger api documentation page.
- **./specification.yaml**: contains the openapi specification which describes all available endpoints and their request and response schemas. This specification is used by `swaggerDocsRouter` to generate the api documentation page. It is also used by `openapi-enforcer-middleware` which will generate an error if any request or response data does not match its specification schema.

## Setup for local development

- fork this repo
- git clone to your local computer then `cd capstone-be-starter`
- create your `.env` file:
  - `cp .env.example .env`
- edit the `.env` file to look like:

```
DATABASE_URL=mongodb://localhost:27017/backendapi
JWT_SECRET=whateveryouwan
```

- From the command line, type `npm install`
- From the command line, type `node index.js` or `nodemon index.js`. Alternatively, you can run in Debug mode in vscode by pressing F5 or from the vscode menu Debug -> Start Debugging
- confirm that the api is working locally by making a request
- note: visiting `localhost:3000` will take you to a api documentation page which shows all the available api endpoints described by `./specification.yaml`.
