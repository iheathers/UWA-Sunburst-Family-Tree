

# Sunburst Family Tree

[![GitHub repo](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/iheathers/UWA-Sunburst-Family-Tree)

## Live Demo: https://uwa-sunburst-family-tree.vercel.app/family-tree

## Overview

The **Sunburst Family Tree** is an interactive web application designed to help users visualize and manage their family tree efficiently. It represents family connections in a sunburst chart format, providing a dynamic and intuitive interface to explore and maintain family data. The application is built with a full-stack architecture, incorporating both backend and frontend components.

## Features

- **Interactive Sunburst Chart**: Visualize your family tree in a sunburst chart, offering a clear and hierarchical view of your ancestry.
- **Family Member Management**: Add, edit, and remove family members directly within the application.
- **Dynamic Interaction**: Zoom in, zoom out, and navigate through the chart with ease. Drill down into specific branches or view detailed biographies of individual members.
- **Data Export**: Export the family tree or associated data in various formats for backup or printing purposes.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across different devices and screen sizes.

## Project Structure

```
.
├── README.md
├── Rationale.md
├── backend
│   ├── media
│   │   └── blank-profile-picture.png
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── controllers
│       │   ├── FamilyMember.controller.js
│       │   ├── FamilyTree.controller.js
│       │   └── User.controller.js
│       ├── models
│       │   ├── FamilyMember.model.js
│       │   └── User.model.js
│       ├── routes
│       │   ├── FamilyMember.route.js
│       │   ├── FamilyTree.route.js
│       │   └── User.route.js
│       └── utils
│           ├── DefaultAdminUser.util.js
│           ├── FamilyMember.util.js
│           ├── FamilyTree.util.js
│           └── UploadImage.util.js
├── frontend
│   ├── README.md
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── app
│       │   ├── (auth)
│       │   │   ├── login
│       │   │   │   └── page.js
│       │   │   ├── signup
│       │   │   │   └── page.js
│       │   │   └── usermaintenance
│       │   │       └── page.js
│       │   ├── (family)
│       │   │   ├── family-member
│       │   │   │   └── [id]
│       │   │   │       ├── add
│       │   │   │       │   └── page.js
│       │   │   │       ├── edit
│       │   │   │       │   └── page.js
│       │   │   │       └── page.js
│       │   │   └── family-tree
│       │   │       └── page.js
│       │   ├── globals.css
│       │   ├── layout.js
│       │   └── page.js
│       ├── components
│       │   ├── AddFamilyMember
│       │   │   ├── AddFamilyMember.js
│       │   │   └── AddFamilyMember.module.css
│       │   ├── BioGraphy
│       │   │   ├── BioGraphy.js
│       │   │   ├── BioGraphy.module.css
│       │   │   └── dateUtils.js
│       │   ├── ChartTitle
│       │   │   ├── ChartTitle.js
│       │   │   └── ChartTitle.module.css
│       │   ├── ComponentName
│       │   │   ├── ComponentName.js
│       │   │   └── ComponentName.module.css
│       │   ├── EditFamilyMember
│       │   │   ├── EditFamilyMember.js
│       │   │   ├── EditFamilyMember.module.css
│       │   │   └── dateUtils.js
│       │   ├── FamilyTree
│       │   │   ├── FamilyTree.js
│       │   │   └── FamilyTree.module.css
│       │   ├── LoginForm
│       │   │   ├── LoginForm.js
│       │   │   └── LoginForm.module.css
│       │   ├── RegistrationForm
│       │   │   ├── HttpStatus.util.js
│       │   │   ├── RegistrationForm.js
│       │   │   └── RegistrationForm.module.css
│       │   ├── SunburstChart
│       │   │   ├── SunburstChart.css
│       │   │   └── SunburstChart.js
│       │   ├── UserMaintenance
│       │   │   ├── UserMaintenance.js
│       │   │   └── UserMaintenance.module.css
│       │   └── ZoomController
│       │       ├── ZoomController.js
│       │       └── ZoomController.module.css
│       ├── data
│       │   ├── familyMember
│       │   │   └── familyMemberDetails.json
│       │   ├── familyTree
│       │   │   ├── deepNestedFamilyTree.json
│       │   │   ├── emptyFamilyTree.json
│       │   │   ├── emptyTree.json
│       │   │   ├── farsiSimpleFamilyTree.json
│       │   │   ├── linearDeepNestedFamilyTree.json
│       │   │   ├── moderateFamilyTree.json
│       │   │   ├── rootOnlyFamilyTree.json
│       │   │   ├── simpleFamilyTree1.json
│       │   │   └── simpleFamilyTree2.json
│       │   └── users
│       │       ├── userDetails.json
│       │       └── users.json
│       ├── hooks
│       │   └── useCustomHook.example.js
│       ├── sharedStyles
│       │   ├── common.module.css
│       │   └── loginAndSignUp.module.css
│       └── utils
│           └── util.example.js
└── package-lock.json
```

### Backend

The backend of the project is built with **Node.js** and **Express.js** and is responsible for handling the API requests, database operations, and user authentication.

- **Controllers**: Manage the business logic related to family members, trees, and users.
- **Models**: Define the schema for family members and users using Mongoose.
- **Routes**: Define the API endpoints for interacting with family data and user information.
- **Utils**: Contain utility functions and scripts, such as creating default admin users and handling image uploads.

### Frontend

The frontend is built using **Next.js**, a React framework, providing server-side rendering, and static site generation.

- **Components**: Reusable UI components such as forms, charts, and navigational elements.
- **Pages**: Organizes the application's routes, including authentication (login/signup), family tree visualization, and user maintenance.
- **Styles**: CSS modules and global styles used throughout the application.
- **Data**: Example data used for demonstration and testing.
- **Hooks**: Custom React hooks for managing state and effects.
- **Utils**: Utility functions for various frontend tasks.

## Installation and Setup

### Prerequisites

- **Node.js** (version 14.x or above)
- **npm** (version 6.x or above)
- **MongoDB** (for backend data storage)

### Steps to Run the Project Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iheathers/UWA-Sunburst-Family-Tree.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd UWA-Sunburst-Family-Tree
   ```

3. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the backend server:**

   ```bash
   cd ../backend
   npm run dev
   ```

6. **Run the frontend server:**

   ```bash
   cd ../frontend
   npm run dev
   ```

7. **Access the application:**

   Open your browser and go to `http://localhost:3000`.
