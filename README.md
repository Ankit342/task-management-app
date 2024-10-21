# Task Management Application

This is a full-stack task management application built using Node.js, Express, MongoDB for the backend, and ReactJS for the frontend. The application allows users to create, update, delete, and manage tasks, with features for marking tasks as important or complete. The app also supports user authentication using JWT (JSON Web Tokens).

## Features

- User authentication (Login/Signup) using JWT.
- Task creation, update, and deletion.
- Mark tasks as important or complete.
- Fetch important, complete, and incomplete tasks.
- RESTful API endpoints for all tasks.
- User-specific task management.
- Task sorting by creation date.

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- React.js
- Express.js

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/Ankit342/task-management-app.git
   cd task-management-app/backend
   ```
2. Install the necessary dependencies:
```
npm i cors express dotenv jsonwebtoken bcryptjs mongoose
```
3. Create a .env file in the backend directory and add the following variables:
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```
4. Start the backend server:
```
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```
cd task-management-app/frontend
```
2. Install the necessary dependencies:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i react-redux @reduxjs/toolkit react-icons axios
```
3. Start the frontend development server:
```
npm run dev
```

## API Endpoints
### Authentication
- POST /signup: Register a new user.
- POST /login: Authenticate a user and return a JWT token.
### Task Management Endpoints
- POST /create-task:
    Create a new task.
    Requires authentication.
    Request Body:

```
{
  "title": "Task Title",
  "desc": "Task description"
}
```
- GET /get-all-tasks:
    Get all tasks of the authenticated user.
    Requires authentication.

- DELETE /delete-task/:id:
    Delete a task by its ID.
    Requires authentication.
    Path Parameter:
    id: ID of the task to be deleted.

- PUT /update-task/:id:
    Update a task's title and description by its ID.
    Requires authentication.
    Request Body:

```
{
  "title": "Updated Title",
  "desc": "Updated description"
}
```
- PUT /update-imp-task/:id:
    Toggle the "important" status of a task by its ID.
    Requires authentication.
    Path Parameter:
    id: ID of the task to be updated.

- PUT /update-complete-task/:id:
    Toggle the "complete" status of a task by its ID.
    Requires authentication.
    Path Parameter:
    id: ID of the task to be updated.

### Filtered Task Endpoints
- GET /get-imp-tasks:
    Get all tasks marked as important.
    Requires authentication.

- GET /get-complete-tasks:
    Get all tasks marked as complete.
    Requires authentication.

- GET /get-incomplete-tasks:
    Get all tasks that are incomplete.
    Requires authentication.

## Authentication Middleware
To secure the routes, the authenticateToken middleware is used. It verifies the JWT token and ensures the user is authenticated.

```
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
```
## Models
### User Model
```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', userSchema);
```
### Task Model
```
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  important: { type: Boolean, default: false },
  complete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
```
