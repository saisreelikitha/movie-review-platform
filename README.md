# Movie Review Platform

A full-stack web application for browsing movies, writing reviews, and managing watchlists.

## Features

- 🔐 User Authentication (Login/Register)
- 🎬 Movie Listing with Details
- ⭐ Movie Reviews and Ratings
- 📝 Add Movies to Watchlist
- 🎨 Modern, Responsive UI

## Tech Stack

- **Frontend:** React.js, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Setup Instructions

### Backend
```bash
cd movie-review-backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Deployment

### Docker (local)
Docker is not available in this workspace. On your machine:
```bash
docker build -t movie-review-backend ./movie-review-backend
docker run -p 5000:5000 --env-file ./movie-review-backend/.env movie-review-backend
```

### Render
1. Push this repo to GitHub.
2. In Render, create a new Web Service from your repo.
   - Environment: Docker
   - Auto-detected `movie-review-backend/Dockerfile`
3. Set environment variables:
   - `PORT` = `5000`
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret
4. Deploy. Health check path: `/health`

Alternatively, use the included `render.yaml` via the Render Blueprint.

## API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/watchlist` - Get user watchlist
- `POST /api/users/watchlist` - Add to watchlist

## Demo

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Screenshots

- Login/Register pages with beautiful UI
- Movie listing with poster images
- Movie details with reviews
- Watchlist functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
