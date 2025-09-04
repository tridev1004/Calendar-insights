# Calendar Analytics Dashboard

A modern React application featuring an interactive calendar with data visualization capabilities. Users can view analytics data in calendar format and explore detailed bar charts for specific dates.

##  Features

- **Interactive Calendar**: Built with React Big Calendar for smooth navigation
- **Data Visualization**: Bar charts using Recharts for detailed analytics
- **Responsive Design**: Beautiful UI that works on all device sizes
- **Date Highlighting**: Visual indicators for dates with available data
- **Modal Charts**: Click on highlighted dates to view detailed bar graphs
- **Alert System**: User-friendly notifications for dates without data
- **Multiple Views**: Month, week, and day view options

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript
- **Calendar**: React Big Calendar with Moment.js
- **Charts**: Recharts for data visualization
- **UI Components**: shadcn/ui with Tailwind CSS
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system

##  Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

2. **Install dependencies**
 

3. **Start the development server**
 
4. **Open your browser**
   Navigate to `http://localhost:8080`

##  Usage

### Calendar Navigation
- Use the **Month**, **Week**, and **Day** buttons to switch between different view modes
- Navigate between months using the calendar navigation arrows
- Click on any date to interact with it

### Viewing Data
- **Highlighted dates** (with blue background) contain data
- **Today's date** is highlighted in green
- Click on any highlighted date to open a detailed chart modal

### Chart Modal Features
- **Summary Cards**: Total users, total value, and average statistics
- **Bar Chart**: Interactive visualization of user activity distribution
- **Data Table**: Detailed breakdown of all data points
- **Responsive Design**: Optimized for both desktop and mobile viewing

### No Data Handling
- Clicking on dates without data shows a helpful alert message
- The system clearly indicates which dates have available data

##  Data Structure

The application uses the following data format:

```json
{
  "01-09-2025": [
    {"user_1": 1},
    {"user_2": 2},
    {"user_3": 3},
    {"user_4": 4}
  ],
  "02-09-2025": [
    {"user_1": 5},
    {"user_2": 8},
    {"user_3": 2}
  ]
}
```

- **Date Format**: DD-MM-YYYY
- **User Data**: Array of objects with user IDs and their corresponding values
- **Values**: Numeric data representing user activity or metrics

##  Design System

The application features a comprehensive design system with:

- **Color Palette**: Calendar-focused blues and analytics greens
- **Semantic Tokens**: Consistent color usage across components
- **Responsive Layout**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant design patterns

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
-  Safari (latest)
-  Edge (latest)

##  Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── CalendarView.tsx    # Main calendar component
│   └── ChartModal.tsx      # Chart modal component
├── data/
│   └── dummyData.ts        # Sample data and utilities
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── pages/
│   └── Index.tsx           # Main page component
└── lib/
    └── utils.ts            # Utility functions
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```
