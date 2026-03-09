# 💳 BankApp — Full Stack Banking Platform

A full-stack personal banking web application built with **Laravel 12**, **React.js**, and **PostgreSQL**. Users can manage their wallet, top up funds, transfer money to other users, and track their full transaction history in real time.

---

## 🚀 Live Demo

>(https://demo-banking-payment-website.vercel.app/)

---

## ✨ Features

- 🔐 **Secure Authentication** — Token-based auth with Laravel Sanctum
- 💰 **Wallet Management** — Top up your balance instantly
- 💸 **Fund Transfers** — Send money to other users by email
- 📊 **Transaction History** — Full history with Sent, Received, and Top Up labels
- 📱 **Responsive Design** — Mobile-friendly sidebar with hamburger menu
- 🛡️ **Rate Limiting** — API endpoints protected against abuse
- ⚡ **Real-time Balance** — Balance updates instantly after every transaction
- 🔒 **Route Protection** — Protected dashboard routes with auth guards

---

## 🛠️ Tech Stack

### Backend
| Technology | Usage |
|---|---|
| Laravel 12 | REST API, Business Logic |
| PostgreSQL | Database |
| Laravel Sanctum | Token-based Authentication |
| PHP 8.2 | Server-side Language |

### Frontend
| Technology | Usage |
|---|---|
| React.js | UI Framework |
| React Router | Client-side Routing |
| Axios | HTTP Client with Interceptors |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Context API | Global State Management |

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php      # Register, Login, Logout, Profile
│   │   └── WalletController.php    # Balance, TopUp, Transfer, Transactions
│   └── Models/
│       ├── User.php
│       └── Transaction.php
├── database/migrations/
├── routes/
│   └── api.php
└── config/
    ├── cors.php
    └── sanctum.php

frontend/
├── src/
│   ├── components/
│   │   └── ui/                     # Reusable UI components
│   ├── Context/
│   │   └── Authcontext.jsx         # Global Auth & Balance State
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TopUp.jsx
│   │   ├── Transfer.jsx
│   │   ├── Transactions.jsx
│   │   └── Settings.jsx
│   ├── services/
│   │   ├── auth.js                 # Auth API calls
│   │   └── wallet.js               # Wallet API calls
│   └── lib/
│       └── axios.js                # Axios instance with interceptors
```

---

## ⚙️ Installation & Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL
- Laravel CLI

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/learningsin2024-source/bankapp.git
cd bankapp/backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure your .env file
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bankingwebsite
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

# Run migrations
php artisan migrate

# Install Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Start the server
php artisan serve
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

# Start development server
npm run dev
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| POST | `/api/logout` | Logout user | Yes |
| GET | `/api/user` | Get current user | Yes |
| PUT | `/api/user/update` | Update profile | Yes |
| PUT | `/api/user/password` | Change password | Yes |

### Wallet
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/wallet/balance` | Get wallet balance | Yes |
| POST | `/api/wallet/top-up` | Top up wallet | Yes |
| POST | `/api/wallet/transfer` | Transfer funds | Yes |
| GET | `/api/transactions` | Get transaction history | Yes |

---

## 🔒 Security Features

- Token-based authentication with Laravel Sanctum
- Rate limiting on all endpoints (5 req/min on auth, 10 req/min on wallet)
- CORS configured for frontend origin only
- Password hashing with bcrypt
- Atomic database transactions for transfers
- Token expiry with automatic redirect to login
- Input validation on all endpoints

---

## 🗄️ Database Schema

### Users Table
```
id, name, email, password, balance, created_at, updated_at
```

### Transactions Table
```
id, sender_id, receiver_id, amount, type, status, reference, created_at, updated_at
```

Transaction types: `topup` | `transfer` | `credit`

---

## 👤 Author

**Koumolou Fatihu**
- GitHub: [@learningsin2024-source](https://github.com/learningsin2024-source)
- Email: learningsin2024@gmail.com
- Location: Abidjan, Côte d'Ivoire

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
