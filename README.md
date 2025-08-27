# ScoreKeep Beta

A comprehensive store rating and management platform with role-based access control, advanced search capabilities, and real-time analytics.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Feature Implementation](#feature-implementation)
- [Testing Guide](#testing-guide)
- [Production Considerations](#production-considerations)

## 🎯 Project Overview

ScoreKeep is a modern web application that enables users to discover, rate, and review stores while providing comprehensive management tools for store owners and administrators. The platform features a robust role-based access control system with three distinct user types: regular users, store owners, and system administrators.

### Key Capabilities

- **Store Discovery & Rating**: Users can browse stores, submit ratings, and modify their reviews
- **Store Management**: Store owners can view customer feedback and analytics
- **System Administration**: Comprehensive user and store management with advanced filtering
- **Real-time Analytics**: Live metrics and performance tracking
- **Responsive Design**: Mobile-first approach with modern UI components

## ✨ Features

### 👤 User Features

- Complete registration with comprehensive validation
- Secure login/logout functionality
- Password management with strength requirements
- Store browsing with advanced search capabilities
- Interactive rating system (1-5 stars)
- Personal rating history and modification

### 🏬 Store Owner Features

- Dedicated dashboard with store analytics
- Customer rating overview with detailed feedback
- Real-time average rating calculations
- Customer interaction history
- Store performance metrics

### 🛠️ Administrator Features

- System-wide dashboard with comprehensive metrics
- User management (create, view, filter, sort)
- Store management with full CRUD operations
- Advanced filtering and sorting capabilities
- Role-based access control management
- Cross-role dashboard access for oversight

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **State Management**: React Query for server state
- **Routing**: React Router with protected routes
- **Form Handling**: React Hook Form with validation
- **Build Tool**: Vite with hot module replacement

## 🚀 Quick Start

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account for backend services

### Installation Steps

```sh
# Step 1: Clone the repository
git clone https://github.com/george-bobby/scorekeep-beta.git

# Step 2: Navigate to the project directory
cd scorekeep-beta

# Step 3: Install dependencies
npm i

# Step 4: Set up environment variables (see Environment Setup section)

# Step 5: Start development server
npm run dev
```

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PASSWORD=your_supabase_password
```

### Getting Supabase Credentials

1. Create a new project at [Supabase](https://supabase.com)
2. Navigate to Settings > API in your project dashboard
3. Copy the required values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - **Project Reference ID** → `VITE_SUPABASE_PROJECT_ID`
4. Set a secure database password → `VITE_SUPABASE_PASSWORD`

## 🗄️ Database Setup

The project includes comprehensive Supabase migrations for complete database schema setup:

```sh
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your_project_id

# Apply migrations
supabase db push
```

### Database Schema

- **Profiles**: User information with validation constraints
- **User Roles**: Role-based access control system
- **Stores**: Store information with owner relationships
- **Ratings**: User-store rating relationships with uniqueness constraints
- **Row Level Security**: Comprehensive access control policies

## 📋 Feature Implementation

### ✅ Authentication & Account Management

#### 👤 Normal User Account

- [x] **Registration**: Name (20-60 chars), Email, Address (max 400 chars), Password validation
- [x] **Login/Logout**: Secure authentication with role-based redirects
- [x] **Password Updates**: Strength validation (8-16 chars, 1 uppercase, 1 special)
- [x] **Role Selection**: Choose user type during registration

#### 🏬 Store Owner Account

- [x] **Dashboard Access**: Dedicated store owner interface
- [x] **Password Management**: Secure password updates
- [x] **Store Analytics**: Customer feedback and rating analytics

#### 🛠️ System Administrator Account

- [x] **Admin Dashboard**: Comprehensive system management interface
- [x] **User Management**: Complete user lifecycle management
- [x] **Store Management**: Full store administration capabilities

### 🏪 Store Management Features

#### User Store Functions

- [x] **Store Discovery**: Browse all registered stores
- [x] **Advanced Search**: Real-time filtering by name and address
- [x] **Rating System**: Interactive 1-5 star rating interface
- [x] **Rating Management**: Submit, view, and modify personal ratings
- [x] **Store Information**: Complete store details with average ratings

#### Store Owner Dashboard

- [x] **Customer Analytics**: View all customer ratings and feedback
- [x] **Performance Metrics**: Real-time average rating calculations
- [x] **Customer Insights**: Detailed customer interaction history

#### Admin Store Management

- [x] **Store Creation**: Add new stores with owner assignment
- [x] **Store Listing**: Complete store directory with filtering
- [x] **Advanced Controls**: Sort and filter by multiple criteria

### 👥 User Management (Admin)

- [x] **User Creation**: Add users with role assignment
- [x] **User Directory**: Complete user listing with details
- [x] **Advanced Filtering**: Multi-criteria user filtering
- [x] **User Details**: Individual profile views with role information
- [x] **Sorting Controls**: Comprehensive sorting options

### 📊 Dashboard Analytics

- [x] **System Metrics**: Real-time user, store, and rating counts
- [x] **Performance Tracking**: Live analytics and reporting
- [x] **Cross-Role Access**: Admin oversight of all user types

### 🔐 Security Features

- [x] **Role-Based Access Control**: Comprehensive RBAC implementation
- [x] **Route Protection**: Secure navigation based on user roles
- [x] **Data Validation**: Multi-layer input validation
- [x] **Row Level Security**: Database-level access control

## 🧪 Testing Guide

### Prerequisites for Testing

1. Development server running: `npm run dev`
2. Access application at: `http://localhost:8081`
3. Supabase project properly configured

### Testing Scenarios

#### 1. User Registration & Authentication

**Test Normal User Account:**

```
Name: "John Smith Customer Account" (20-60 characters)
Email: "john.customer@example.com"
Address: "123 Main Street, Anytown, USA 12345"
Password: "Password123!" (meets requirements)
Role: "User"
```

**Test Store Owner Account:**

```
Name: "Sarah Johnson Store Owner"
Email: "sarah.storeowner@example.com"
Address: "456 Business Ave, Commerce City, USA 54321"
Password: "StorePass123!"
Role: "Store Owner"
```

**Test Admin Account:**

```
Name: "Michael Admin System Manager"
Email: "admin@scorekeep.com"
Address: "789 Admin Blvd, Control Center, USA 99999"
Password: "AdminPass123!"
Role: "Admin"
```

#### 2. Store Management Testing

**As Admin - Create Store:**

1. Access Admin Dashboard
2. Click "Add Store" button
3. Fill store details:
   - Name: "Tech Haven Electronics"
   - Email: "contact@techhaven.com"
   - Address: "123 Tech Street, Silicon Valley, CA 94000"
4. Verify store creation and listing

**As User - Rate Stores:**

1. Login as normal user
2. Navigate to User Dashboard
3. Browse store listings
4. Submit ratings (1-5 stars)
5. Modify existing ratings
6. Test search functionality

#### 3. User Management Testing (Admin)

1. Login as admin
2. Access user management interface
3. Test filtering by roles and search
4. View individual user details
5. Test sorting functionality
6. Attempt user creation (demo mode)

#### 4. Dashboard Analytics Testing

1. Verify system metrics accuracy
2. Test cross-role dashboard access
3. Validate real-time data updates
4. Check role-based navigation

### Validation Testing

**Input Validation Tests:**

- Name length constraints (20-60 characters)
- Address length limits (400 characters max)
- Password strength requirements
- Email format validation
- Rating bounds (1-5 only)

**Security Testing:**

- Route protection verification
- Role-based access control
- Unauthorized access prevention
- Secure logout functionality

### Expected Test Results

**Success Indicators:**

- ✅ Forms submit with valid data
- ✅ Error messages for invalid input
- ✅ Role-based dashboard redirects
- ✅ CRUD operations function properly
- ✅ Real-time search and filtering
- ✅ Proper sorting functionality
- ✅ Role-appropriate navigation
- ✅ Cross-role admin access with badges

**Common Expected Behaviors:**

- ⚠️ Demo messages for admin user creation
- ⚠️ Placeholder emails in admin dashboard
- ⚠️ Store owner assignment uses current admin

### Troubleshooting

**If Features Don't Work:**

1. Check browser console for errors
2. Verify Supabase configuration
3. Ensure database migrations applied
4. Check Row Level Security policies
5. Clear browser cache if needed

## 🚀 Production Considerations

### Current Implementation Status

- ✅ Fully functional development environment
- ✅ Complete database schema with migrations
- ✅ Comprehensive feature implementation
- ✅ Modern, responsive UI/UX

### Production Enhancement Path

**Server-Side Requirements:**

- Implement Supabase Edge Functions for admin operations
- Set up proper email verification workflows
- Create real store owner assignment system
- Add comprehensive error handling and logging

**Security Enhancements:**

- Implement proper admin user creation
- Add audit trails and activity logging
- Set up monitoring and alerting
- Configure production security policies

**Performance Optimizations:**

- Implement data pagination
- Add caching strategies
- Optimize database queries
- Set up CDN for static assets

### Demo Limitations

Due to client-side Supabase limitations, some features use demo approaches:

1. **Admin User Creation**: Shows demo message (production needs server-side)
2. **Store Owner Assignment**: Uses current admin (production needs proper lookup)
3. **Email Access**: Uses placeholders (production needs proper auth access)

## 📊 Success Metrics

After complete testing, you should have:

- ✅ Multiple user accounts with different roles
- ✅ Functional stores with active ratings
- ✅ Working search, filter, and sort functionality
- ✅ Proper role-based access control
- ✅ All dashboard features operational
- ✅ Real-time analytics functioning

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
