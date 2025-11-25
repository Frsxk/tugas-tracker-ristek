---
applyTo: '**'
---
# Tugas Tracker Backend API

A RESTful API for managing academic assignments (tugas) and courses (mata kuliah) built with Express.js and Prisma.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL/MySQL database
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create `.env` file):
   ```
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Error message"
}
```

---

### Login User
**POST** `/api/auth/login`

Authenticate user and get access token. You can login using either username or email.

**Request Body (with email):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Body (with username):**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Error Response (400):**
```json
{
  "error": "Username or email is required"
}
```

---

### Logout User
**POST** `/api/auth/logout`

Logout user (client-side token removal).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 📖 Mata Kuliah (Course) Endpoints

> **Note:** All mata kuliah endpoints require authentication.

### Get All Courses
**GET** `/api/matakuliah`

Get all courses for the authenticated user.

**Response (200):**
```json
[
  {
    "id": "course_id",
    "nama": "Pemrograman Web",
    "deskripsi": "Course about web development",
    "sks": 3,
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "_count": {
      "tugas": 5
    }
  }
]
```

---

### Get Course by ID
**GET** `/api/matakuliah/:id`

Get a specific course with its assignments.

**Parameters:**
- `id` (string): Course ID

**Response (200):**
```json
{
  "id": "course_id",
  "nama": "Pemrograman Web",
  "deskripsi": "Course about web development",
  "sks": 3,
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "tugas": [
    {
      "id": "assignment_id",
      "nama": "Assignment 1",
      "deskripsi": "Create a web page",
      "status": "PENDING",
      "deadline": "2024-01-15T23:59:59.000Z"
    }
  ],
  "_count": {
    "tugas": 1
  }
}
```

**Error Response (404):**
```json
{
  "error": "Mata Kuliah not found"
}
```

---

### Create Course
**POST** `/api/matakuliah`

Create a new course.

**Request Body:**
```json
{
  "nama": "Pemrograman Web",
  "deskripsi": "Course about web development",
  "sks": 3
}
```

**Response (201):**
```json
{
  "id": "course_id",
  "nama": "Pemrograman Web",
  "deskripsi": "Course about web development",
  "sks": 3,
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Course
**PUT** `/api/matakuliah/:id`

Update an existing course.

**Parameters:**
- `id` (string): Course ID

**Request Body:**
```json
{
  "nama": "Updated Course Name",
  "deskripsi": "Updated description",
  "sks": 4
}
```

**Response (200):**
```json
{
  "message": "Updated successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Mata Kuliah not found"
}
```

---

### Delete Course
**DELETE** `/api/matakuliah/:id`

Delete a course.

**Parameters:**
- `id` (string): Course ID

**Response (204):** No content

**Error Response (404):**
```json
{
  "error": "Mata Kuliah not found"
}
```

---

## 📝 Tugas (Assignment) Endpoints

> **Note:** All tugas endpoints require authentication.

### Get All Assignments
**GET** `/api/tugas`

Get all assignments for the authenticated user.

**Response (200):**
```json
[
  {
    "id": "assignment_id",
    "nama": "Assignment 1",
    "deskripsi": "Create a web page",
    "status": "PENDING",
    "deadline": "2024-01-15T23:59:59.000Z",
    "mataKuliahId": "course_id",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "mataKuliah": {
      "id": "course_id",
      "nama": "Pemrograman Web",
      "sks": 3
    }
  }
]
```

---

### Get Assignment by ID
**GET** `/api/tugas/:id`

Get a specific assignment.

**Parameters:**
- `id` (string): Assignment ID

**Response (200):**
```json
{
  "id": "assignment_id",
  "nama": "Assignment 1",
  "deskripsi": "Create a web page",
  "status": "PENDING",
  "deadline": "2024-01-15T23:59:59.000Z",
  "mataKuliahId": "course_id",
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "mataKuliah": {
    "id": "course_id",
    "nama": "Pemrograman Web",
    "sks": 3
  }
}
```

**Error Response (404):**
```json
{
  "error": "Tugas not found"
}
```

---

### Create Assignment
**POST** `/api/tugas`

Create a new assignment.

**Request Body:**
```json
{
  "nama": "Assignment 1",
  "deskripsi": "Create a web page",
  "status": "PENDING",
  "deadline": "2024-01-15T23:59:59.000Z",
  "mataKuliahId": "course_id"
}
```

**Response (201):**
```json
{
  "id": "assignment_id",
  "nama": "Assignment 1",
  "deskripsi": "Create a web page",
  "status": "PENDING",
  "deadline": "2024-01-15T23:59:59.000Z",
  "mataKuliahId": "course_id",
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "mataKuliah": {
    "id": "course_id",
    "nama": "Pemrograman Web",
    "sks": 3
  }
}
```

---

### Update Assignment
**PUT** `/api/tugas/:id`

Update an existing assignment.

**Parameters:**
- `id` (string): Assignment ID

**Request Body:**
```json
{
  "nama": "Updated Assignment",
  "deskripsi": "Updated description",
  "status": "COMPLETED",
  "deadline": "2024-01-20T23:59:59.000Z",
  "mataKuliahId": "course_id"
}
```

**Response (200):**
```json
{
  "message": "Updated successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Tugas not found"
}
```

---

### Delete Assignment
**DELETE** `/api/tugas/:id`

Delete an assignment.

**Parameters:**
- `id` (string): Assignment ID

**Response (204):** No content

**Error Response (404):**
```json
{
  "error": "Tugas not found"
}
```

---

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing authentication |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## 🔧 Data Models

### User
```json
{
  "id": "string",
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string (hashed)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Mata Kuliah (Course)
```json
{
  "id": "string",
  "nama": "string",
  "deskripsi": "string",
  "sks": "number",
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Tugas (Assignment)
```json
{
  "id": "string",
  "nama": "string",
  "deskripsi": "string",
  "status": "string (PENDING|IN_PROGRESS|COMPLETED)",
  "deadline": "datetime",
  "mataKuliahId": "string",
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📝 Notes for Frontend Development

1. **Authentication Flow:**
   - Register/Login to get JWT token
   - Store token in localStorage/sessionStorage
   - Include token in Authorization header for protected routes

2. **Date Format:**
   - All dates are in ISO 8601 format
   - Use `new Date().toISOString()` when sending dates

3. **Error Handling:**
   - All errors return JSON with `error` field
   - Check response status codes for proper error handling

4. **CORS:**
   - CORS is enabled for all origins in development
   - Adjust CORS settings for production deployment