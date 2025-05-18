# Deployment Guide for MathQuiz Application

This document provides instructions for deploying the MathQuiz application, which consists of a Next.js frontend and a Nest.js backend.

## Prerequisites

- Node.js (v18.x or newer)
- npm or yarn package manager
- Git for version control
- A hosting platform account (recommendations below)

## Frontend Deployment (Next.js)

The frontend is built with Next.js and can be easily deployed to Vercel, Netlify, or similar platforms.

### Building for Production

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. To test the production build locally:
   ```bash
   npm run start
   ```

### Deploying to Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com) if you don't have one.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Deploy with one command:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project. For subsequent deployments:
   ```bash
   vercel --prod
   ```

### Environment Variables for Frontend

Configure the following environment variables in your hosting platform:

- `NEXT_PUBLIC_API_URL`: The URL of your backend API (e.g., `https://your-backend-api.com/api`)

## Backend Deployment (Nest.js)

The backend can be deployed to platforms like Heroku, Railway, DigitalOcean, or AWS.

### Building for Production

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the production server:
   ```bash
   npm run start:prod
   ```

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI.
2. Create a new Heroku app:
   ```bash
   heroku create mathquiz-backend
   ```

3. Add a Procfile in the backend directory:
   ```
   web: npm run start:prod
   ```

4. Deploy to Heroku:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Environment Variables for Backend

Configure the following environment variables in your hosting platform:

- `PORT`: The port your app will run on (often set automatically by the hosting platform)
- `CORS_ORIGIN`: The URL of your frontend application (e.g., `https://your-frontend-app.vercel.app`)

## Docker Deployment (Optional)

For more advanced deployment scenarios, you can containerize both applications.

### Backend Dockerfile

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

### Frontend Dockerfile

Create a `Dockerfile` in the frontend directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

### Running with Docker Compose

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - CORS_ORIGIN=http://localhost:3000
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001/api
    depends_on:
      - backend
```

Run both services:
```bash
docker-compose up
```

## Testing the Deployment

After deploying:

1. Access the frontend application and verify it loads correctly
2. Try taking a quiz to confirm the backend connection is working
3. Verify that internationalization features work correctly
4. Test the application on different devices and browsers

## Troubleshooting

- If the frontend can't connect to the backend, check that the `NEXT_PUBLIC_API_URL` is set correctly
- If CORS errors occur, ensure the backend's `CORS_ORIGIN` includes the frontend's domain
- For 404 errors on the backend, verify the API endpoints are prefixed correctly

## Maintenance and Updates

For future updates:

1. Make code changes and test locally
2. Build and deploy to staging environments first
3. Once verified, deploy to production following the steps above 