# Environment Variable Setup for MathQuiz

This document explains how to properly set up environment variables for both the frontend and backend of the MathQuiz application.

## Frontend Environment Variables

The frontend requires the following environment variables:

- `NEXT_PUBLIC_API_URL`: The URL of the backend API (e.g., `https://mathquiz-backend.onrender.com/api`)

### Setting up in Vercel

1. Go to your project on the [Vercel dashboard](https://vercel.com/dashboard)
2. Select your MathQuiz project
3. Go to "Settings" > "Environment Variables"
4. Add a new variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://mathquiz-backend.onrender.com/api`
   - Environment: Production (and optionally Preview and Development)
5. Click "Save"
6. Redeploy your application to apply the changes

### Local Development

For local development, create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_API_URL=https://mathquiz-backend.onrender.com/api
```

For local backend testing, use:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Backend Environment Variables

The backend requires the following environment variables:

- `PORT`: The port to run the server on (often set automatically by the hosting platform)
- `CORS_ORIGIN`: The URL of your frontend application (e.g., `https://math-quiz-39z5yln88-fabriciotonegutti-gmailcoms-projects.vercel.app`)

### Setting up in Render

1. Go to your service on the [Render dashboard](https://dashboard.render.com)
2. Select your MathQuiz backend service
3. Go to "Environment" tab
4. Add the following environment variables:
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://math-quiz-39z5yln88-fabriciotonegutti-gmailcoms-projects.vercel.app`)
5. Click "Save Changes"
6. Your service will automatically redeploy with the new environment variables

### Local Development

For local development, create a `.env` file in the backend directory with:

```
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## Testing the Configuration

After setting up environment variables, verify that:

1. The frontend can successfully connect to the backend API
2. CORS is properly configured to allow communication between the two services

### Troubleshooting

If you encounter issues:

1. Check browser console for CORS errors
2. Verify that environment variables are correctly set
3. Ensure that both frontend and backend are properly deployed
4. Check that the API URLs match exactly, including trailing slashes 