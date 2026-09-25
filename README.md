# AASD Client

Web client for a medical appointment and consultation platform. The application gives patients and medical staff authenticated access to profiles, consultation requests, appointment workflows, and real-time discussions.

## Features

- Account registration, login, password recovery, and protected routes
- Patient and medical professional profiles
- Consultation and appointment request screens
- Real-time discussions through Socket.IO
- Responsive interface with light and dark themes

## Tech Stack

- React and Vite
- React Router, Axios, and Socket.IO Client
- Ant Design, Radix UI, Tailwind CSS, and Lucide icons
- React Hook Form and Zod

## Getting Started

```bash
npm install
npm run dev
```

The development server is provided by Vite. The API base URL and other environment-specific values are read from the local environment configuration; use your own development credentials and do not commit secrets.

## Available Commands

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

The matching Express API is maintained in the `AASD_SERVER` repository.
