# Environment Variables

This document lists all the environment variables required for the application to function properly.

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PORT` | Port for the backend server | `3001` |
| `NODE_ENV` | Node environment | `development` or `production` |
| `DATABASE_URL` | PostgreSQL database connection string | `postgresql://username:password@localhost:5432/ecommerce_db` |
| `JWT_SECRET` | Secret for signing JWT access tokens | `your_jwt_secret_here` |
| `JWT_REFRESH_SECRET` | Secret for signing JWT refresh tokens | `your_jwt_refresh_secret_here` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_your_stripe_publishable_key` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_your_stripe_secret_key` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_your_stripe_webhook_secret` |
| `PAYPAL_CLIENT_ID` | PayPal client ID | `your_paypal_client_id` |
| `PAYPAL_CLIENT_SECRET` | PayPal client secret | `your_paypal_client_secret` |
| `PAYPAL_MODE` | PayPal mode (sandbox or live) | `sandbox` |
| `SMTP_HOST` | SMTP server host | `smtp.example.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Whether to use TLS | `false` |
| `SMTP_USER` | SMTP username | `your_email@example.com` |
| `SMTP_PASS` | SMTP password | `your_email_password` |
| `SMTP_FROM` | Sender email address | `your_email@example.com` |
| `FRONTEND_URL` | URL of the frontend application | `http://localhost:3000` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API | `http://localhost:3001/api` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_your_stripe_publishable_key` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client ID | `your_paypal_client_id` |

## How to Obtain API Keys

### Stripe
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers > API keys
3. Copy the publishable and secret keys
4. For webhook secret:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-backend-url/api/checkout/stripe-webhook`
   - Copy the signing secret

### PayPal
1. Visit [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Create a new application
3. Copy the client ID and client secret
4. For webhook:
   - Go to the application settings
   - Add webhook URL: `https://your-backend-url/api/checkout/paypal-webhook`

### Email Configuration
For development, you can use:
- [Mailtrap](https://mailtrap.io/) for testing emails
- Gmail SMTP settings:
  - Host: `smtp.gmail.com`
  - Port: `587`
  - Secure: `true`
  - User: Your Gmail address
  - Pass: Your Gmail app password (not regular password)

## Security Best Practices

1. Never commit `.env` files to version control
2. Use strong, randomly generated secrets for JWT
3. Rotate API keys regularly
4. Use environment-specific keys (development vs production)
5. Restrict permissions on `.env` files:
   ```bash
   chmod 600 .env
   ```