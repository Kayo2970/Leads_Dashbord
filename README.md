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

## 🎨 Design System
The UI utilizes a deep blue/cyan colour token system directly inspired by the official LEADS website, ensuring brand consistency across internal tools. All cards feature frosted glass transparency (`backdrop-filter`) and smooth hover animations.

---
*Built for the LEADS Next Gen Centre | Version 1.0*
