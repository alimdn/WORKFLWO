# E-Commerce Store

A complete e-commerce store with frontend, backend, database, payment integration, and admin panel.

## Features

- User authentication (register, login, social login)
- Product listing and details
- Shopping cart
- Secure checkout with Stripe and PayPal
- Admin panel for product management and order processing
- Referral system
- Email notifications
- Payment webhooks
- Audit logging

## Project Structure

```
.
├── backend/                 # Node.js + Express REST API
│   ├── config/              # Configuration files
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── Dockerfile           # Backend Docker configuration
├── frontend/                # Next.js React application
│   ├── pages/               # Next.js pages
│   ├── components/          # React components
│   ├── styles/              # CSS styles
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # Frontend Docker configuration
├── db/                      # Database schema and migrations
│   ├── schema.sql           # Database schema
│   ├── migrations/          # Database migrations
│   └── seeds/               # Seed data
├── infra/                   # Infrastructure files
│   └── docker-compose.yml   # Docker Compose configuration
├── scripts/                 # Setup and utility scripts
│   ├── dev-setup.sh         # Development setup script
│   ├── dev-setup.bat        # Windows development setup script
│   ├── start-dev.sh         # Development start script
│   └── start-dev.bat        # Windows development start script
├── DEPLOYMENT.md            # Deployment instructions
└── README.md                # This file
```

## Technology Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for database
- **JWT** for authentication
- **Stripe** and **PayPal** for payments
- **Nodemailer** for email notifications
- **Swagger** for API documentation

### Frontend
- **Next.js** React framework
- **Tailwind CSS** for styling
- **React Icons** for icons
- **Axios** for HTTP requests

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **PostgreSQL** database

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker and Docker Compose (optional, for containerized deployment)

### Development Setup

#### Automated Setup (Recommended)
```bash
# On Unix/Linux/macOS
./scripts/dev-setup.sh

# On Windows
scripts\dev-setup.bat
```

#### Manual Setup
1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create database and run migrations:
   ```bash
   createdb ecommerce_db
   cd backend
   # Run migrations (see DEPLOYMENT.md for details)
   ```

4. Configure environment variables:
   ```bash
   cd backend
   cp .env.example .env
   # Update .env with your configuration
   ```

### Running the Application

#### Development Mode
```bash
# On Unix/Linux/macOS
./scripts/start-dev.sh

# On Windows
scripts\start-dev.bat
```

#### Manual Start
1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api-docs

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## API Documentation

The API is documented using Swagger. When the backend is running, visit:
http://localhost:3001/api-docs

## Environment Variables

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

## Payment Gateway Setup

### Stripe
1. Create a Stripe account at https://stripe.com
2. Obtain your API keys from the Stripe Dashboard
3. Configure the webhook endpoint in your Stripe Dashboard:
   - Endpoint URL: `https://your-backend-url/api/checkout/stripe-webhook`
   - Events to listen for: `checkout.session.completed`

### PayPal
1. Create a PayPal Business account at https://paypal.com
2. Create a new application in the PayPal Developer Dashboard
3. Obtain your API credentials
4. Configure the webhook endpoint in your PayPal Dashboard:
   - Endpoint URL: `https://your-backend-url/api/checkout/paypal-webhook`

## Security Considerations

1. Never commit secrets to version control
2. Use HTTPS in production
3. Implement proper rate limiting
4. Validate all user inputs
5. Keep dependencies up to date
6. Regularly backup your database
7. Monitor logs for suspicious activity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.