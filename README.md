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

## Run Locally

1. Install Node.js 18 or newer.
2. Start the matching `AASD_SERVER` API and confirm that it is available locally.
3. Open a terminal in this repository and install the dependencies:

   ```bash
   npm install
   ```

4. Create `.env.local` in the repository root and point the client to the API and its public image server:

   ```dotenv
   VITE_API_REST_API_URL=http://localhost:3000/api/v1
   VITE_API_CDN_SERVER=http://localhost:3000
   ```

5. Start the Vite development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite, normally `http://localhost:5173`.

Use local development values and do not commit private configuration.

## Available Commands

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

The matching Express API is maintained in the `AASD_SERVER` repository.
