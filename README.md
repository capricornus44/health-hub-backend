# 🏥 Doctor Appointment System - NestJS Backend

A robust and scalable backend API for a doctor appointment management system built with **NestJS**, **Drizzle ORM**, and **PostgreSQL**. This server provides secure user authentication, email verification, and a foundation for managing medical appointments.

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration** with comprehensive profile data collection
- **Email Verification** system with secure token-based verification
- **Password Security** using Argon2 hashing algorithm
- **Rate Limiting** to prevent abuse (10 requests per 60 seconds)
- **CORS** enabled for cross-origin requests
- **Helmet** for enhanced HTTP security headers
- **Compression** middleware for optimized response sizes

### 👤 User Management
- Complete user profile with personal information:
  - Name, surname, date of birth
  - Full address (street, city, house, state, apartment, zip)
  - Contact details (email, phone)
  - Gender and citizenship
- Email verification workflow
- Secure password storage (never exposed in responses)

### 🗄️ Database
- **PostgreSQL** database with **Drizzle ORM**
- Type-safe database queries
- Migration system for schema versioning
- Separate development and production database configurations
- Visual database management with Drizzle Studio

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Progressive Node.js framework |
| **TypeScript** | Type-safe development |
| **Drizzle ORM** | Lightweight TypeScript ORM |
| **PostgreSQL** | Relational database |
| **Argon2** | Password hashing |
| **Helmet** | Security middleware |
| **Compression** | Response compression |
| **Class Validator** | DTO validation |
| **pnpm** | Fast, disk space efficient package manager |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v10.22.0 or higher)
- **PostgreSQL** (v14 or higher)

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd nestjs_server
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8800
NODE_ENV=development

# Database URLs
DATABASE_URL_DEVELOPMENT=postgresql://user:password@localhost:5432/doctor_appointment_dev
DATABASE_URL_PRODUCTION=postgresql://user:password@localhost:5432/doctor_appointment_prod

# Email Configuration (for future implementation)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-password
```

### 4. Database Setup

Generate and run migrations:

```bash
# Generate migration files
pnpm migrate:generate

# Apply migrations
pnpm migrate:up
```

---

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm start:dev` | Start development server with hot-reload |
| `pnpm start:prod` | Start production server |
| `pnpm build` | Build the application |
| `pnpm lint` | Lint and fix code |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm test:cov` | Run tests with coverage |
| `pnpm migrate:generate` | Generate database migrations |
| `pnpm migrate:up` | Apply database migrations |
| `pnpm studio` | Open Drizzle Studio (database GUI) |
| `pnpm kill:dev` | Kill process on port 8800 |
| `pnpm kill:studio` | Kill process on port 4983 |

---

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John",
  "surname": "Doe",
  "dob": "1990-01-15",
  "street": "123 Main St",
  "city": "New York",
  "house": "123",
  "state": "NY",
  "apartment": "4B",
  "zip": "10001",
  "phone": "+1234567890",
  "gender": "male",
  "citizenship": "US",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "message": "Please check your email to verify your account",
  "data": {
    "id": 1,
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "isVerified": false,
    "createdAt": "2025-11-21T14:45:21.000Z",
    "updatedAt": "2025-11-21T14:45:21.000Z"
  }
}
```

#### Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "token": "your-verification-token-here"
}
```

**Response:**
```json
{
  "message": "Email verified successfully. Please sign in with your login and password"
}
```

### Health Check

#### Get Server Status
```http
GET /
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-21T14:45:21.000Z",
  "uptime": 12345.67
}
```

---

## 🗂️ Project Structure

```
nestjs_server/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── __tests__/          # Auth tests
│   │   ├── dto/                # Data Transfer Objects
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.service.ts     # Auth business logic
│   │   ├── auth.module.ts      # Auth module definition
│   │   └── email.service.ts    # Email service (mock)
│   ├── db/                      # Database layer
│   │   ├── migrations/         # Database migrations
│   │   └── schema/             # Database schemas
│   │       ├── user.schema.ts  # User table schema
│   │       └── index.ts        # Schema exports
│   ├── drizzle/                # Drizzle ORM configuration
│   │   └── drizzle.module.ts   # Drizzle module
│   ├── types/                  # TypeScript type definitions
│   ├── app.controller.ts       # Main app controller
│   ├── app.service.ts          # Main app service
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── test/                        # E2E tests
├── drizzle.config.ts           # Drizzle configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── .env                        # Environment variables
```

---

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PRIMARY KEY | Unique user identifier |
| `name` | varchar(255) | NOT NULL | User's first name |
| `surname` | varchar(255) | NOT NULL | User's last name |
| `dob` | date | NOT NULL | Date of birth |
| `street` | varchar(255) | NOT NULL | Street address |
| `city` | varchar(255) | NOT NULL | City |
| `house` | varchar(255) | NOT NULL | House number |
| `state` | varchar(255) | NOT NULL | State/Province |
| `apartment` | varchar(255) | NULLABLE | Apartment number |
| `zip` | varchar(255) | NOT NULL | ZIP/Postal code |
| `phone` | varchar(255) | NOT NULL | Phone number |
| `gender` | varchar(50) | NOT NULL | Gender |
| `citizenship` | varchar(255) | NOT NULL | Citizenship |
| `email` | varchar(255) | UNIQUE, NOT NULL | Email address |
| `password_hash` | varchar(255) | NOT NULL | Hashed password |
| `is_verified` | boolean | DEFAULT false | Email verification status |
| `verification_token` | varchar(255) | NULLABLE | Email verification token |
| `created_at` | timestamp | DEFAULT NOW() | Record creation time |
| `updated_at` | timestamp | DEFAULT NOW() | Last update time |

---

## 🔒 Security Features

### Password Security
- Passwords are hashed using **Argon2**, a memory-hard hashing algorithm
- Password hashes are never returned in API responses
- Secure token generation for email verification using crypto.randomBytes

### Rate Limiting
- Configured to allow **10 requests per 60 seconds** per IP
- Prevents brute force attacks and API abuse

### HTTP Security
- **Helmet** middleware adds security headers:
  - Content Security Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security
  - And more...

### Input Validation
- All DTOs use **class-validator** decorators
- Automatic validation of incoming requests
- Type safety with TypeScript

---

## 🧪 Testing

### Run Unit Tests
```bash
pnpm test
```

### Run E2E Tests
```bash
pnpm test:e2e
```

### Run Tests with Coverage
```bash
pnpm test:cov
```

---

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Run Production Server

```bash
# Set environment to production
export NODE_ENV=production

# Start the server
pnpm start:prod
```

### Environment Variables for Production

Ensure the following environment variables are set:

- `NODE_ENV=production`
- `PORT` (default: 8800)
- `DATABASE_URL_PRODUCTION` (PostgreSQL connection string)

---

## 🔧 Development Tools

### Drizzle Studio

Visual database management interface:

```bash
pnpm studio
```

Access at: `http://localhost:4983`

### Database Migrations

Generate new migration:
```bash
pnpm migrate:generate
```

Apply migrations:
```bash
pnpm migrate:up
```

---

## 📚 Future Enhancements

- [ ] JWT-based authentication
- [ ] Refresh token mechanism
- [ ] Password reset functionality
- [ ] Doctor profile management
- [ ] Appointment booking system
- [ ] Appointment scheduling and calendar
- [ ] Real email service integration (SendGrid, AWS SES, etc.)
- [ ] Patient medical records
- [ ] File upload for documents
- [ ] Real-time notifications
- [ ] Admin dashboard
- [ ] Role-based access control (RBAC)
- [ ] Payment integration
- [ ] SMS notifications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting

Run linting and formatting:
```bash
pnpm lint
pnpm format
```

---

## 🐛 Troubleshooting

### Port Already in Use

If port 8800 is already in use:
```bash
pnpm kill:dev
```

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check database credentials in `.env`
3. Ensure database exists
4. Run migrations: `pnpm migrate:up`

### Migration Issues

If migrations fail:
```bash
# Drop and recreate database (⚠️ WARNING: This will delete all data)
dropdb doctor_appointment_dev
createdb doctor_appointment_dev

# Re-run migrations
pnpm migrate:up
```

---

## 📄 License

This project is licensed under the **UNLICENSED** license.

---

## 👨‍💻 Author

Built with ❤️ using NestJS

---

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review the NestJS documentation: https://docs.nestjs.com

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Powerful open-source database
- [Argon2](https://github.com/ranisalt/node-argon2) - Password hashing

---

**Happy Coding! 🚀**
