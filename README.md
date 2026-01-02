# Bookstore Application

A full-stack web application for browsing and reading books with user authentication and book management features.

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Password Management**: Forget password and reset password via email
- **Book Management**: Browse paid and free books
- **Protected Routes**: Access to paid books requires authentication
- **Reading Interface**: Read books with a dedicated reader page
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS & DaisyUI
- Axios
- Framer Motion
- React Hook Form
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (Password Hashing)
- Nodemailer (Email Service)
- Cookie Parser

## Project Structure

```
BOOKSTORE/
├── backend/
│   ├── configs/          # MongoDB configuration
│   ├── controllers/       # Route controllers
│   ├── middlewares/      # Authentication middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Email service
│   └── server.js         # Server entry point
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── contexts/      # Auth context
    │   ├── pages/         # Page components
    │   └── assets/        # Static assets
    └── public/            # Public assets
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BOOKSTORE
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   HOSTNAME=localhost
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (default Vite port)

## API Endpoints

### User Routes (`/user`)
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `POST /user/logout` - User logout
- `POST /user/forget-password` - Request password reset
- `POST /user/reset-password` - Reset password with token
- `GET /user/me` - Get current user (protected)

### Book Routes (`/book`)
- `GET /book/allbooks` - Get all books (protected)
- `GET /book/read/:id` - Read a specific book (protected)

### Free Book Routes (`/free`)
- Free book endpoints (public access)

## Environment Variables

Make sure to set up the following environment variables in your backend `.env` file:

- `PORT` - Server port (default: 3000)
- `HOSTNAME` - Server hostname (default: localhost)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Email address for sending emails
- `EMAIL_PASS` - Email password or app password

## Features in Detail

- **Authentication**: JWT-based authentication with secure password hashing
- **Email Service**: Password reset functionality via email
- **Protected Routes**: Middleware to protect authenticated routes
- **Book Categories**: Books organized by categories
- **Free Books**: Public access to free books
- **Paid Books**: Protected access requiring user authentication

## License

ISC

## Author

Created as a full-stack bookstore application.
