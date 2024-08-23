# Backend for React Application

## Overview

This backend application provides API endpoints for user authentication and management, including OTP-based signup, login, profile management, and password recovery. The backend is deployed live on Render.

## API Endpoints

1. **Sign Up Process**
   - **`POST /signupsendotp`**: Sends an OTP to the user's email for account creation.
   - **`POST /signupverifyotp`**: Verifies the OTP received by the user to complete the signup process.

2. **Login Process**
   - **`POST /login`**: Logs in the user using their email and password.

3. **Profile Management**
   - **`PUT /profileupdate`**: Allows logged-in users to update their profile information.

4. **Password Recovery**
   - **`POST /forgotpassword`**: Sends a password reset link to the user's email.
   - **`POST /resetpassword`**: Resets the password using the link received via email.

## Live 

The backend is live on Render.

## postman 

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/21900132-10ef892e-00c9-44e2-bfa6-cb1b43a25f7b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D21900132-10ef892e-00c9-44e2-bfa6-cb1b43a25f7b%26entityType%3Dcollection%26workspaceId%3D827b5173-c3e4-472f-a280-d04b0d6482a3)

## Installation & Running the Application

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance (URI required).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/virugamacoder/evitalrx-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-backend-repo
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:

    ```plaintext
    MOONGOOSE_URI=your-mongodb-uri
    PORT=your-port-number
    JWT_SECRET=your-jwt-secret
    EMAIL_USERNAME=your-email-username
    EMAIL_PASSWORD=your-email-password
    FRONTEND_URL=your-frontend-url
    ```

2. Ensure that the values for the environment variables are set correctly.

### Running the Application

1. Start the server:

    ```bash
    npm start
    ```

2. The backend server will be running at `http://localhost:your-port-number`.
