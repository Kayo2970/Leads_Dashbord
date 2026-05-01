# LEADS Portal

LEADS Portal is an internal office management system with built-in HR functionality for the LEADS Next Gen Centre at M S Ramaiah University of Applied Sciences (MSRUAS), Bengaluru. 

## 🚀 Features

- **Dynamic Dark Theme:** A premium, fully responsive glassmorphism UI with animated aurora background and live theme toggling.
- **Role-Based Dashboards:** Integrated hierarchy (Professor, Core, Trainee) with different permission levels.
- **Task Management:** Assign, edit, and track tasks. Superior users can update task details, statuses, and assignees.
- **Event Scheduling:** Create events with date, time, venue, and description. Tasks can be linked directly to events.
- **HR Benchmarking:** Advanced rating system with scores for Communication, Punctuality, and Work Quality.
- **Member Directory:** Onboard new members, set specific designations, and manage committee placements.
- **Reports & Export:** Master SQL performance reports can be exported directly to Excel (`.xlsx`).
- **Broadcast System:** Post announcements globally or target specific committees.
- **Profile Customization:** Personalize your own profile with picture URLs, designations, and details.
- **SQL Backend:** High-performance local SQLite database powered by Prisma ORM and a singleton connection pattern.

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
