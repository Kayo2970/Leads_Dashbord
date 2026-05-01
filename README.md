# LEADS Portal

LEADS Portal is an internal office management system with built-in HR functionality for the LEADS Next Gen Centre at M S Ramaiah University of Applied Sciences (MSRUAS), Bengaluru. 

## 🚀 Features

- **Dynamic Dark Theme:** A premium, fully responsive glassmorphism UI with animated aurora background.
- **Role-Based Dashboards:** Unique dashboard views for Super Admins, Faculty Admins, and Student Members.
- **Task Management:** Assign and track tasks across various committees with ease.
- **Performance Ratings:** Built-in 1-5 rating system to track student contributions after each event.
- **SQL Backend:** Fully integrated local SQLite database powered by Prisma ORM.

## 🛠 Tech Stack

- **Frontend:** Next.js 14+ (App Router), React, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui, Framer Motion
- **Database:** SQLite via Prisma ORM
- **Icons:** Lucide React

## 💻 Getting Started

To run this application locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Sync the database schema:**
   *(Ensure your `.env` contains `DATABASE_URL="file:./dev.db"`)*
   ```bash
   npx prisma db push
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the portal:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. 
   *(Note: If viewing on another device on your local network, run `npm run dev -- -H 0.0.0.0`)*

## 🔐 Login Details (Local Testing)

For local development and testing, you can use the following mock accounts representing the 3-tier hierarchy:

**Level 1: Professor / Super Admin**
- Email: `professor@msruas.ac.in`
- Password: `password123`
- *Capabilities: Assign work to anyone, review timelines, generate/export reports, full overview.*

**Level 2: Core Committee Member**
- Email: `core@msruas.ac.in`
- Password: `password123`
- *Capabilities: Assign work to trainees, review trainee performance, manage specific events.*

**Level 3: Trainee / Student Member**
- Email: `trainee@msruas.ac.in`
- Password: `password123`
- *Capabilities: View assigned work, submit completed tasks, view personal performance ratings.*

---
*Built for the LEADS Next Gen Centre | Version 1.0*
