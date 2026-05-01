 Task Manager Application
A modern, full-stack Task Management application designed to help users organize, track, and manage their daily tasks efficiently. Built with Next.js, Prisma, and PostgreSQL.

 Live Demo
Live Application: https://task-manager-production-15e3.up.railway.app

Tech Stack
Framework: Next.js (React)

Database: PostgreSQL (Hosted on Neon)

ORM: Prisma Client

Authentication: NextAuth.js

Styling: Tailwind CSS

⚙️ Features
User Authentication: Secure Sign-up and Login system using NextAuth.

Task CRUD Operations: Create, Read, Update, and Delete tasks.

Task Status Tracking: Organize tasks by categories/status (Pending, In-Progress, Completed).

Responsive Design: Fully optimized for both Mobile and Desktop views.

Getting Started
Follow these instructions to set up the project locally on your machine.

Prerequisites
Ensure you have the following installed on your system:

Node.js (v16+)

npm or yarn

Git

Installation
Clone the repository:

Bash
git clone <your-repository-url>
cd task-manager
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env file in the root directory and add the following variables:

Code snippet
DATABASE_URL="postgresql://<username>:<password>@<host>/<dbname>?sslmode=require&connect_timeout=30"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
Run Database Migrations:

Bash
npx prisma db push
Start the Development Server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
Plaintext
task-manager/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   └── app/                # Next.js App Router and APIs
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── package.json            # Project dependencies
└── README.md               # Documentation
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.