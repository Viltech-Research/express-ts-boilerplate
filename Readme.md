# Express Typescript Boilerplate

Kickstart your Electron app development with this TypeScript boilerplate! This repository provides a clean and well-organized foundation for building cross-platform desktop applications using Electron and TypeScript.

## Features

- **Express.js**: Fast unopinionated, minimalist web framework for Node.js
- **Typescript**: Static typing for a safer codebase
- **Nodemon**: Automatic server refresh for development
- **OAuth2.0**: Secure login and user sessions using [passport.js](https://www.passportjs.org/)
- **Protected Database**: All passwords are salted and hashed into [MongoDB](https://www.mongodb.com/)
- **Session Storage**: Keep track of each session in the database
- **Middlewares**: [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), [bodyparser](https://www.npmjs.com/package/body-parser), and [passport.js](https://www.passportjs.org/)
- **Logging**: Custom logs


## Installation

Clone the repository:
```bash
  git clone https://github.com/Viltech-Research/express-ts-boilerplate.git project_name
  cd project_name
```
    
Install dependencies:
```bash
    npm Install
```

Running the Application (localhost:3000)
```bash
    npm run start
```

Developing the Application (localhost:3000)
```bash
    npm run dev
```
## API Reference

#### **Protected endpoint**

```http
  GET /api/
```

if you are logged in you will see
```json
{ message: server date }
```
if you are not logged in you will see
```json
{ message: "not logged in" }
```

#### **Register**

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required**|

#### **Login**

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required**|

