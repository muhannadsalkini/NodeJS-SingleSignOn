# NodeJS OAuth2 Single Sign-On Application

This repository contains a Node.js-based Single Sign-On (SSO) application using OAuth2 authentication. It allows users to authenticate with a single account via popular OAuth providers (e.g., Google, GitHub).

## Prerequisites
Ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js installation)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/muhannadsalkini/NodeJS-SingleSignOn
   cd NodeJS-SingleSignOn
   ```

2. **Set Up Environment Variables:**
   Create a `.env` file in the root of the project and set the following variables:

   ```env
   PORT=4000
   MONGO_URL=yourMongoUrl
   JWT_SECRET=YourJWTSecret
   JWT_EXPIRES_IN=1d
   ```

   Replace `yourMongoUrl` and `YourJWTSecret` with the credentials.

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Application:**
   ```bash
   npm start
   ```
   This will start the server at `http://localhost:4000`.

5. **Access the Application:**
   Open your browser and visit `http://localhost:4000/`. The application should be accessible, and users can initiate the OAuth2 authentication process.

## Development

For development, you can use the following command to run the application with nodemon for automatic server restarts:

```bash
npm run dev
```
This uses [nodemon](https://nodemon.io/) to automatically restart the server when changes are detected.

## Docker

To run the application using Docker, make sure Docker is installed, and then execute the following commands:

1. **Set Up Dockerfile:**
   Edit the `Dockerfile` file in the root of the project and set the variables.


2. **Build The Image and Run:**
   ```bash
   docker build -t oauth2-sso-app .
   docker run -p 4000:4000 -d oauth2-sso-app
   ```

This will build a Docker image and run the container on port 4000.

Feel free to customize the application or Docker settings based on your requirements. Happy coding!
