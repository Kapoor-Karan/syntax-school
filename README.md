# Syntax School

<div align="center">

![Banner Image](./FRONTEND/public/Syntax_School.png)

_A modern e-learning platform for mastering computer science._

[Demo](https://syntax-school-frontend.vercel.app/login) · [Report Bug](https://github.com/harshpreet931/markd/issues) · [Request Feature](https://github.com/harshpreet931/markd/issues)

</div>

## Overview

Syntax School is an interactive learning platform for computer science enthusiasts. It enables instructors to create courses with YouTube-hosted videos, quizzes, and text-based resources, while students can enroll, learn, and track their progress. The platform is built using modern web technologies to deliver a responsive and seamless experience.

## Key Features

- **Secure Authentication System**
    - JWT-based authentication
    - Protected routes
    - Secure password hashing
    - Role-based access control

- **Course Management**
    - Create/Edit/Delete courses
    - Embed YouTube videos
    - Upload text resources
    - Add interactive quizzes

- **Student Features**
    - Enroll in courses
    - Access course materials
    - Take quizzes with real-time feedback
    - Track learning progress

- **Modern UI/UX**
    - Responsive design
    - Intuitive navigation
    - Clean and engaging interface

---

## **Tech Stack**

### **Frontend**

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Navigation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool

### **Backend**

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [JWT](https://jwt.io/) - Authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

---

## Prerequisites

```json
{
  "node": ">=14.x",
  "npm": ">=6.x",
  "mongodb": ">=4.x"
}
```

## Quick Start

1. **Clone and Install**

```bash
# Clone the repository
git clone https://github.com/Kapoor-Karan/syntax-school.git

# Install dependencies
cd syntax-school
npm install
```

2. **Environment Setup**

```bash
# Backend (.env)
PORT=8080
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Frontend (.env)
VITE_API_URL=http://localhost:8080

```

3. **Development**

```bash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

## Project Structure

```
syntax-school/
├── backend/                # Backend source code
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Database models
│   └── routes/             # API routes
└── frontend/               # Frontend source code
    ├── public/             # Static assets
    └── src/
        ├── components/     # Reusable components
        ├── pages/          # Page components
        └── routes/         # Route definitions

```

---

## **Application Flow**

1. **Authentication**
   - User registration with secure JWT-based authentication.
   - Protected routes ensure role-based access for instructors and students.

2. **Course Management**
   - Instructors can create and manage courses with YouTube videos and resources.
   - Students can enroll in courses, view materials, and take quizzes.

3. **Progress Tracking**
   - Students can monitor their course progress, including lessons completed and quizzes taken.

---

## **Acknowledgments**

- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://www.mongodb.com/docs)

---

<div align="center">
Made with ❤️ by Karan Kapoor
</div>



