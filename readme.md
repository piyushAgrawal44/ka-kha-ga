📌 Project Name — "क-ख-ग" Platform

A full-stack monorepo containing:

Backend API (Node.js + Express + Prisma)

Frontend Web App (React.js)

Public Website (Static landing site)

Cron Jobs (Scheduled background tasks)

This project follows a modular, scalable architecture where each core layer is isolated inside its own directory.

📁 Project Folder Structure
root/
│
├── app/         # Frontend (React.js)
│   ├── src/
│   ├── public/
│   └── ...
│
├── api/         # Backend API (Express + Prisma + Zod)
│   ├── src/
│   ├── prisma/
│   └── ...
│
├── www/         # Public marketing website (static React.js static)
│   └── ...
│
├── cron/        # Scheduled tasks (Node scripts / workers)
│   └── ...
│
└── package.json

📂 1. /app — Frontend (Next.js)

The main user-facing dashboard.

Includes:

React 19

TailwindCSS

Redux Toolkit + RTK Query

Protected routes (auth guard)

Pages: Login, Dashboard, Parents, Invitations, etc.

Purpose:

Admin and internal team use this app to manage:

Parent Invitations

Partners

Students

Reports

All internal operations

📂 2. /api — Backend API (Express)

Core backend logic in TypeScript.

Includes:

Express REST API

Prisma ORM

Zod validation

Nodemailer email service

bcryptjs for password hashing

Authentication middleware

Invitation & parent modules

Purpose:

Handles all business logic:

Partner → Parent invitation flow

User authentication

CRUD operations

Email sending

Background processing

Database queries

📂 3. /www — Public Website

Lightweight public-facing website (landing page).

Includes:

Static HTML/CSS OR

Next.js SSG

Contact form (optional)

Branding pages

Purpose:

Public visitors see this site.
Product info, pricing, contact, FAQs, etc.

📂 4. /cron — Scheduled Jobs

Background tasks that run automatically.

Examples:

Auto-expire pending invitations

Send reminders

Daily cleanup tasks

Logs management

Purpose:

Keeps the system running smoothly without manual effort.

🚀 Installation & Setup
Prerequisites

Make sure you have:

Node.js >= 18

npm or yarn

PostgreSQL / MySQL DB (based on Prisma schema)

Git

🧩 1. Install Dependencies
Install for root + subprojects
npm install


Then install inside each folder:

cd app
npm install

cd ../api
npm install

cd ../www
npm install

cd ../cron
npm install

🔧 2. Environment Variables

Create a .env file inside /api:

DATABASE_URL="your-db-url"
JWT_SECRET="your-secret"
SMTP_HOST=""
SMTP_USER=""
SMTP_PASS=""
FRONTEND_URL="http://localhost:5169"


And inside /app:

NEXT_PUBLIC_API_URL="http://localhost:4500/api/v1"

🗄️ 3. Setup Database

Inside /api:

npx prisma migrate dev


Generate client:

npx prisma generate

▶️ 4. Start the Project
Start Backend (API)
cd api
npm run dev


Default:
http://localhost:4500

Start Frontend (App)
cd app
npm run dev


Default:
http://localhost:5169

Start Public Site (www)
cd www
npm run dev

Start Cron Jobs
cd cron
npm run start


or for development:

npm run dev

🧪 Testing APIs

Use tools like:

Thunder Client

Postman

Insomnia

Base URL:

http://localhost:4500/api/v1/

📦 Build for Production
App:
cd app
npm run build
npm run start

API:
cd api
npm run build
npm run start

✔️ Project Completed Structure
app      → React/Next.js dashboard  
api      → Node/Express backend  
www      → Public website  
cron     → Scheduled background tasks  


Everything is modular, scalable, and deployment-ready.