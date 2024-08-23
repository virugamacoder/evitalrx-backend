# Backend : 

## Introduction

This backend service offers robust API endpoints for user authentication and profile management, including OTP-based signup, login, profile updates, and password recovery. The service is currently deployed on Render.

## 🏗️ Project Structure

- **Backend**: Developed with Node.js and Express.js
- **Database**: MongoDB

## 🚀 Key Features

- **User Authentication**: Supports signup, login, password recovery, and OTP verification.
- **Profile Management**: Allows users to retrieve and update their profile information.
- **Validation**: Utilizes Yup for input validation.
- **Email Notifications**: Manages OTP and password reset emails.

## 📂 API Endpoints

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

## 🔧 Installation and Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB instance (provide URI).

### Installation Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/virugamacoder/evitalrx-backend.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd evitalrx-backend
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

### Configuration

1. **Create a `.env` File** in the root of the project and include:

    ```plaintext
    MONGO_URI=your-mongodb-uri
    PORT=your-port-number
    JWT_SECRET=your-jwt-secret
    EMAIL_USERNAME=your-email-username
    EMAIL_PASSWORD=your-email-password
    FRONTEND_URL=your-frontend-url
    ```

2. **Verify that environment variables** are correctly set.

### Running the Application

1. **Start the Server:**

    ```bash
    npm start
    ```

2. **Access the server at** `http://localhost:your-port-number`.

## 🚀 Deployment

**Deploy on Render**

1. **Sign Up or Log In** to [Render](https://render.com).
2. **Create a New Web Service**: Link your GitHub repository to Render and set up the backend service.
3. **Add Environment Variables**: Configure MONGO_URI, JWT_SECRET, EMAIL_USERNAME, EMAIL_PASSWORD, FRONTEND_URL in the Render dashboard.
4. **Deploy**: Click the deploy button. Render will handle the deployment process.

    The backend service is available at [https://evitalrx-backend.onrender.com](https://evitalrx-backend.onrender.com).

## 🧪 API Testing with Postman

To test the API endpoints:
Access the Postman collection here: [Postman Collection](https://www.postman.com/galactic-comet-839856/workspace/evitalrx-krunalvirugama)

## 📦 Additional Dependencies

- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB Object Data Modeling (ODM)
- **jsonwebtoken**: JWT authentication
- **nodemailer**: Email handling
- **Yup**: Schema validation

