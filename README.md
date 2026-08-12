# NetflixServer

A Node.js + Express REST API backend for a Netflix-style streaming application. It handles authentication, user profiles, media management, avatar selection, profile watchlists, and movie or show reviews.

## Features

- User signup and login with JWT authentication
- Role-based user support (`admin` / `user`)
- Multiple user profiles per account (up to 5)
- Profile creation, update, deletion, and lookup
- Personal movie/show list per profile
- Media catalog management for movies and TV shows
- Public and user-specific review APIs
- Avatar support for profile images
- MongoDB integration with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS

## Project Structure

```bash
NetflixServer/
├── controllers/
│   ├── avatarController.js
│   ├── mediaController.js
│   ├── reviewController.js
│   └── userController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── avatar.js
│   ├── Media.js
│   ├── Review.js
│   └── User.js
├── routers/
│   ├── AvatarRoutes.js
│   ├── mediaRoutes.js
│   ├── profileListRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── constants.js
├── db_connection.js
├── index.js
├── package.json
├── server.js
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A `.env` file configured with your database and JWT settings

## Installation

```bash
git clone <your-repository-url>
cd NetflixServer
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=mongodb://localhost:27017/netflixserver
DB_USER=your_db_user
DB_PASSWORD=your_db_password
SECRET_KEY=your_super_secret_key
PORT=3001
NODE_ENV=development
```

## Run the Server

```bash
npm run server
```

The server will start on the configured port (default: `3001`).

## API Overview

### Authentication

- `POST /api/auth/signup` — create a new user
- `POST /api/auth/login` — login and receive a JWT token

### User Profiles

- `POST /api/user/profiles/:userId` — add a profile
- `GET /api/user/profiles/:userId` — get all profiles
- `GET /api/user/profiles/:userId/:profileId` — get a single profile
- `PUT /api/user/profiles/:userId/:profileId` — edit a profile
- `DELETE /api/user/profiles/:userId/:profileId` — delete a profile

### Profile Watchlist

- `GET /api/profile-list/:userId/profile/:profileId` — get a profile's list
- `POST /api/profile-list/:userId/profile/:profileId` — add an item to the list
- `DELETE /api/profile-list/:userId/profile/:profileId/:movieId` — remove an item from the list

### Media

- `POST /api/add-media` — add media item
- `DELETE /api/delete-media/:id` — delete media item
- `GET /api/media?type=movie` — get all media, optionally filtered by type

### Reviews

- `POST /api/reviews` — create a review
- `GET /api/reviews/public/:mediaId` — fetch public reviews for a media item
- `GET /api/reviews/user/:userId` — fetch all reviews by a user
- `GET /api/reviews/user/:userId/reviews` — fetch recent reviews by a user

### Avatars

- `POST /api/avatar` — add an avatar
- `GET /api/avatar/:number` — fetch avatar by number

## Example Payloads

### Signup

```json
{
  "email": "user@example.com",
  "password": "12345678",
  "role": "user"
}
```

### Login

```json
{
  "email": "user@example.com",
  "password": "12345678",
  "rememberMe": true
}
```

### Add Profile

```json
{
  "name": "John",
  "profilePhoto": 2,
  "profileNumber": 1
}
```

### Add Review

```json
{
  "userId": "64d6d2c4f5b7a0cdef123456",
  "mediaId": "64d6d3a9f5b7a0cdef654321",
  "text": "Great movie!",
  "isPublic": true,
  "rating": 5
}
```

## Notes

- The app uses automatic local IP detection in the server startup and will log the host address.
- The backend is designed to work with a frontend app that consumes the JSON API responses.
- Some routes may require authentication middleware in a future version of the project.

## License

This project is currently unlicensed unless otherwise specified.

## Contributing

Contributions are welcome. You can fork the project, make your changes, and open a pull request.

## Author

This backend was built for a Netflix-inspired streaming application and can be extended further for production use.
