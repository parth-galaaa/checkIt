# CheckIt

A modern, intuitive task management application built with Next.js and Supabase. Stay organized, track your todos, and manage your tasks with real-time synchronization across all your devices.

🔗 **Live Demo**: [https://checkit.parthgala.com](https://checkit.parthgala.com)

## Features

### Task Management
- **Create & Organize**: Build custom lists to categorize your tasks
- **Rich Tasks**: Add descriptions, priority levels, and due dates to your todos
- **Quick Actions**: Mark tasks complete, edit details, or delete with ease
- **List Types**: Choose between task lists (with priorities) or casual lists for simpler tracking

### Calendar View
- **Visual Planning**: Interactive calendar showing tasks by due date
- **Date Navigation**: Browse months and click dates to filter your tasks
- **Due Date Indicators**: See at a glance which days have pending tasks

### Real-time Synchronization
- **Instant Updates**: Changes sync across all your devices in real-time
- **Cross-tab Sync**: Keep multiple browser tabs/windows in perfect sync
- **Optimistic UI**: Instant feedback with seamless server synchronization

### User Experience
- **Responsive Design**: Beautiful interface that works on desktop, tablet, and mobile
- **Dark Mode**: Switch between light and dark themes for comfortable viewing
- **Smooth Animations**: Polished transitions powered by Framer Motion
- **Empty States**: Helpful guidance when you're just getting started

### Account Management
- **Secure Authentication**: Email/password authentication via Supabase
- **Profile Management**: Update your display name and preferences
- **Password Reset**: Easy password recovery via email
- **Change Email**: Update your email address securely

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier works great)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/checkit.git
cd checkit
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database:

Run the SQL commands in [database-setup.sql](database-setup.sql) in your Supabase SQL editor to create the required tables.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```