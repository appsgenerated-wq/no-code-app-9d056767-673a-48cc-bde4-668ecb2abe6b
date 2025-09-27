# FoodApp - A Manifest-Powered Restaurant Finder

This is a complete full-stack food discovery application built with React and Manifest. It allows users to browse restaurants, add their own, and write reviews.

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Restaurant Management**: Authenticated users can create, update, and delete their own restaurant listings.
- **Review System**: Users can post reviews with ratings and comments for any restaurant.
- **Dynamic Frontend**: A responsive React single-page application for a seamless user experience.
- **Zero-Config Backend**: Powered entirely by Manifest, providing an auto-generated REST API, database, and admin panel.
- **Role-Based Access**: Clear policies define what users, owners, and admins can do.

## Tech Stack

- **Backend**: Manifest
- **Frontend**: React, Vite, Tailwind CSS
- **SDK**: `@mnfst/sdk`

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Setup

1.  **Clone the repository**

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root of the frontend project and add your Manifest backend URL:
    ```
    VITE_BACKEND_URL=your-manifest-backend-url
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## Demo Credentials

- **Email**: `diner@manifest.build`
- **Password**: `password`

## Admin Panel

Access the auto-generated admin panel to manage all data, users, and files:

- **URL**: `[your-backend-url]/admin`
- **Admin Email**: `admin@manifest.build`
- **Admin Password**: `admin`
