# ScoreKeep Beta

## Project info

A modern web application for score keeping and store management.

## How can I edit this code?

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/george-bobby/scorekeep-beta.git

# Step 2: Navigate to the project directory.
cd scorekeep-beta

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables (see Environment Setup section below)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment Setup

This project uses Supabase for backend services. You'll need to set up environment variables for the application to work properly.

1. Create a `.env` file in the root directory of the project
2. Add the following environment variables:

```env
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PASSWORD=your_supabase_password
```

### Getting Supabase Credentials

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the following values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - **Project Reference ID** → `VITE_SUPABASE_PROJECT_ID`
4. Set a secure database password → `VITE_SUPABASE_PASSWORD`

## Database Setup

This project includes Supabase migrations in the `supabase/migrations/` folder. To set up the database:

1. Install the Supabase CLI: `npm install -g supabase`
2. Link your project: `supabase link --project-ref your_project_id`
3. Push the migrations: `supabase db push`

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend as a Service)
- React Query (Data fetching)
- React Router (Routing)
- React Hook Form (Form handling)
