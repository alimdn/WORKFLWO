# Deployment Instructions

This document provides detailed instructions for deploying the e-commerce application.

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker and Docker Compose (for containerized deployment)
- Accounts with Stripe and PayPal for payment processing

## Local Development Setup

### 1. Database Setup

1. Install PostgreSQL 15+ on your system
2. Create a new database:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```
3. Run the database migrations:
   ```bash
   cd backend
   npm run migrate
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration values:
   - Database connection string
   - JWT secrets
   - Stripe and PayPal API keys
   - Email configuration

5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your API configuration:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api" > .env.local
   echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key" >> .env.local
   echo "NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id" >> .env.local
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Docker Deployment

### 1. Using Docker Compose (Recommended)

1. Navigate to the infra directory:
   ```bash
   cd infra
   ```

2. Update the `docker-compose.yml` file with your configuration values

3. Start all services:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5432

### 2. Individual Docker Containers

#### Backend
```bash
cd backend
docker build -t ecommerce-backend .
docker run -p 3001:3001 --env-file .env ecommerce-backend
```

#### Frontend
```bash
cd frontend
docker build -t ecommerce-frontend .
docker run -p 3000:3000 ecommerce-frontend
```

## Cloud Deployment

### Frontend Deployment

#### Vercel (Recommended for Next.js)
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the frontend:
   ```bash
   cd frontend
   vercel
   ```

3. Configure environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

#### Netlify
1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy the frontend:
   ```bash
   cd frontend
   netlify deploy
   ```

### Backend Deployment

#### Heroku
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set DATABASE_URL=your_database_url
   heroku config:set JWT_SECRET=your_jwt_secret
   # Set other required environment variables
   ```

4. Deploy the backend:
   ```bash
   git push heroku main
   ```

#### Render
1. Create a new Web Service on Render
2. Connect your repository
3. Set the build command:
   ```bash
   npm install
   ```
4. Set the start command:
   ```bash
   npm start
   ```
5. Add environment variables in the Render dashboard

#### AWS EC2
1. Launch an EC2 instance with Ubuntu
2. SSH into the instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. Install Node.js and PostgreSQL:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql postgresql-contrib
   ```

4. Clone your repository:
   ```bash
   git clone your-repo-url
   ```

5. Set up the database and environment variables

6. Start the application:
   ```bash
   cd backend
   npm install
   npm start
   ```

## Payment Gateway Setup

### Stripe
1. Create a Stripe account at https://stripe.com
2. Obtain your API keys from the Stripe Dashboard:
   - Publishable Key (for frontend)
   - Secret Key (for backend)
   - Webhook Signing Secret
3. Configure the webhook endpoint in your Stripe Dashboard:
   - Endpoint URL: `https://your-backend-url/api/checkout/stripe-webhook`
   - Events to listen for: `checkout.session.completed`

### PayPal
1. Create a PayPal Business account at https://paypal.com
2. Create a new application in the PayPal Developer Dashboard
3. Obtain your API credentials:
   - Client ID
   - Client Secret
4. Configure the webhook endpoint in your PayPal Dashboard:
   - Endpoint URL: `https://your-backend-url/api/checkout/paypal-webhook`

## Environment Variables

The following environment variables are required:

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing JWT access tokens
- `JWT_REFRESH_SECRET` - Secret for signing JWT refresh tokens
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYPAL_CLIENT_SECRET` - PayPal client secret
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_SECURE` - Whether to use TLS (true/false)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - Sender email address
- `FRONTEND_URL` - URL of the frontend application
- `CORS_ORIGIN` - Allowed CORS origin

### Frontend
- `NEXT_PUBLIC_API_BASE_URL` - Base URL of the backend API
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - PayPal client ID

## Security Considerations

1. Never commit secrets to version control
2. Use HTTPS in production
3. Implement proper rate limiting
4. Validate all user inputs
5. Keep dependencies up to date
6. Regularly backup your database
7. Monitor logs for suspicious activity

## Monitoring and Maintenance

1. Set up application monitoring (e.g., Sentry, New Relic)
2. Implement log aggregation (e.g., ELK stack)
3. Schedule regular database backups
4. Monitor payment webhook deliveries
5. Keep SSL certificates up to date