# Tugas Tracker
> A Final Project for RISTEK Web Dev Open Class

## Project Description
This website is made for students that needs to solve their bad time management habit. he website is designed to be a comprehensive academic planner and personal organization tool for students.

## Repository structure
```
📁 tugas-tracker-ristek
├── app
│   ├── (auth)/login           # Login UI
│   ├── (auth)/register        # Registration UI
│   ├── (routes)/course-management
│   ├── (routes)/task-management
│   ├── (routes)/task-tracker  # Feature pages
│   ├── globals.css            # Base styles + Tailwind import
│   ├── layout.tsx             # Global shell (header, footer, theming)
│   └── page.tsx               # Landing page with hero + feature grid
├── components
│   ├── common/                # Reusable utilities (theme toggle, etc.)
│   ├── layout/                # Header and footer
│   ├── providers/             # Theme provider wrapper
│   ├── sections/              # Hero, feature grid
│   └── ui/                    # Reserved for future UI primitives
├── public                     # Static assets
├── package.json
└── README.md
```

## Getting started
```pwsh
npm install
npm run dev
```
Then open `http://localhost:3000`.
