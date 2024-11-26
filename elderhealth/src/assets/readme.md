# ElderHealth Mobile Web Application

A React-based mobile web application for managing health-related events, medications, and tasks. Built with React, Tailwind CSS, and shadcn/ui components.

## Project Structure

```
src/
├── components/
│   ├── navigation/
│   │   ├── Navbar.jsx        # Bottom tab navigation
│   │   └── Header.jsx        # Mobile header with back button
│   ├── layout/
│   │   └── Layout.jsx        # Main layout wrapper
│   │   └── AuthLayout.jsx        # Authentication layout
│   │   └── DashboardLayout.jsx        Dashboard Layout
│   └── ui/                   # shadcn/ui components
│   ├── calendar/
│   │   ├── Calendar.jsx        
│   │   ├── Navbar.jsx        
│   │   ├── EventCard.jsx
│   │   ├── EventForm.jsx
│   │   ├── EventList.jsx
├── hooks/
│   ├── use-toast.js
├── pages/
│   ├── auth/
│   │   ├── Login.jsx         # Login page
│   │   └── Signup.jsx        # Signup page
│   ├── calendar/
│   │   ├── CalendarPage.jsx  # Main calendar view
│   │   └── EventManagementPage.jsx # Event creation/management
│   ├── medication/
│   │   └── MedicationList.jsx # Medication management
│   └── dashboard/
│       └── Dashboardjsx      # Dashboard management 
│   └── tasks/
│       └── TaskList.jsx      # Task management
│       └── AddTask.jsx      # Task management
│       └── EditTask.jsx      # Task management
├── lib/
│   └── utils.js             # Utility functions
├── App.jsx                  # Main routing setup
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## Features Implemented

### Navigation
- Mobile-first bottom tab navigation
- Page-specific headers with back navigation
- Route protection and management

### Calendar Module
1. Calendar View
   - Interactive calendar with event indicators
   - Bottom sheet for date selection
   - Visual indicators for joined/unjoined events
   - Local storage integration for event persistence

2. Event Management
   - Create new events with title and time
   - Join/unjoin event functionality
   - Event listing by date
   - Event status tracking

### Data Persistence
```javascript
// Event Structure in localStorage
{
  "2024-11-24": [
    {
      id: 1,
      title: "Doctor's Appointment",
      time: "09:00",
      joined: false
    }
  ]
}
```

## Tech Stack

- **React**: Frontend framework
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **date-fns**: Date manipulation
- **localStorage**: Data persistence

## Component Usage

### Layout Component
```jsx
<Layout>
  <Header title="Page Title" showBack={true} />
  <main className="pt-14 pb-16 px-4">
    {/* Page content */}
  </main>
  <Navbar />
</Layout>
```

### Navigation Implementation
```jsx
// Bottom Tab Navigation
const tabs = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Pill, label: "Medications", path: "/medications" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" }
];
```

### Calendar Events
```jsx
// Creating a new event
const handleCreateEvent = () => {
  const newEvent = {
    id: Date.now(),
    title: "Event Title",
    time: "12:00",
    joined: false
  };
  // Store in localStorage
};
```

## Routes Configuration

```jsx
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* App Routes - With Layout */}
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/calendar" element={<CalendarPage />} />
    <Route path="/events" element={<EventManagementPage />} />
    <Route path="/medications" element={<MedicationList />} />
    <Route path="/tasks" element={<TaskList />} />
  </Route>
</Routes>
```

## Styling Guide

- Uses Tailwind CSS for styling
- Mobile-first design approach
- shadcn/ui components for consistent UI
- Custom theme configuration in `index.css`

## Current Features

1. Authentication Pages
   - Login
   - Signup

2. Calendar Management
   - View calendar
   - Create events
   - Join/unjoin events
   - Event indicators
   - Date selection

3. Navigation
   - Bottom tab bar
   - Back navigation
   - Page headers

## Planned Features

1. Medication Management
   - Add medications
   - Set reminders
   - Track medication history

2. Task Management
   - Create tasks
   - Set due dates
   - Mark tasks complete

3. Dashboard
   - Overview of events
   - Medication reminders
   - Task summaries

## Development Guidelines

1. Mobile-First Design
   - Optimize for touch interactions
   - Consider thumb-friendly zones
   - Use appropriate tap targets

2. Component Structure
   - Keep components focused and reusable
   - Implement proper prop validation
   - Maintain consistent styling

3. State Management
   - Use localStorage for persistence
   - Implement proper loading states
   - Handle errors gracefully

4. Navigation
   - Maintain intuitive flow
   - Implement proper back navigation
   - Show loading indicators

## Getting Started

1. Installation
```bash
npm install
```

2. Run Development Server
```bash
npm run dev
```

3. Build for Production
```bash
npm run build
```

## Style Guidelines
- Use camelCase for variable and function names
- Use PascalCase for component names
- Follow React Hooks conventions
- Maintain consistent spacing and indentation
- Document complex logic and component usage

For more detailed implementation specifics, refer to individual component files and documentation.
