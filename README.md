# Finance and Budgeting Expense Tracker

## Overview
The Finance and Budgeting Expense Tracker is a web application designed to help users log and track their financial transactions, analyze spending habits, and receive AI-powered financial advice. This project aims to provide users with a seamless experience in managing their finances, categorizing expenses, and making data-driven financial decisions.

## Features

### 1. **Expense Logging**
Users can add their financial transactions with details such as:
- Description
- Amount
- Category (e.g., Food, Rent, Salary, Utilities, Entertainment, etc.)
- Payment Method (Credit Card, Cash, Bank Transfer)
- Date (auto-assigned at the time of entry)

### 2. **Expense Tracking & Visualization**
- Users can view their financial records in a structured list.
- Data visualization features (e.g., pie charts, spending trends) help users analyze their spending patterns.
- The app provides an intuitive interface for filtering expenses based on date, category, or amount.

### 3. **AI-Powered Budget Suggestions**
- The application integrates an AI API that provides personalized financial advice based on the user's spending habits.
- The AI suggests areas where users can optimize their budget and provides spending recommendations.

### 4. **User Authentication (Removed in Current Version)**
- The project originally used Clerk authentication for user management, but for development purposes, the authentication system has been removed, and a hardcoded user ID is used instead.
- This allows testing the application without requiring user sign-in.

### 5. **Backend Integration**
- The application communicates with a backend server to fetch, store, update, and delete financial records.
- The backend is deployed on Render and exposes RESTful API endpoints for managing financial data.

## Tech Stack
### **Frontend**
- **React** (for building the user interface)
- **React Router** (for client-side routing)
- **CSS** (for styling the components)

### **Backend**
- **Node.js & Express** (for handling API requests)
- **MongoDB** (for storing financial records)
- **Render** (for deployment of the backend)

### **AI API**
- AI-powered financial advice is integrated into the system to provide insights into spending habits.

## How It Works
1. Users navigate to the application and interact with the navbar to access different sections.
2. The "Add Finance" section allows users to enter transaction details.
3. The "See Finances" section provides an overview of all recorded transactions.
4. The "Get Personalized Advice" section fetches AI-driven insights based on the user's financial data.
5. Data is stored in a backend database, ensuring persistence across sessions.

## Future Enhancements
- **Re-enable authentication** using Clerk or Firebase.
- **Implement user-specific dashboards** with savings goals and monthly spending summaries.
- **Improve AI suggestions** by incorporating machine learning models for more accurate predictions.
- **Introduce budget tracking tools** with notifications and alerts for overspending.

This project is a step towards better personal finance management, making it easier for users to track their spending and optimize their financial habits!
