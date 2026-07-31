Sure! Based on everything you've shared, here's a clean **hackathon-ready** project description and setup guide.

---

# Vagabond – Student Relocation & Community Platform

## Project Description

**Vagabond** is a one-stop platform designed to simplify the relocation experience for students moving to a new city or university. Instead of relying on multiple apps and websites, students can find accommodation, buy and sell second-hand essentials, and connect with compatible roommates—all from a single platform.

The project addresses common challenges faced by students such as finding affordable housing, reducing moving costs through a student marketplace, and building a support network in a new environment.

---

## Key Features

### 🏠 Accommodation Finder

* Browse available rental properties.
* View detailed property information.
* Save favorite listings to a wishlist.
* User authentication for secure access.

### 🛒 Student Marketplace

* Buy and sell second-hand items.
* Search and filter products by category.
* View detailed product listings.
* Shopping cart functionality.
* Add, edit, and delete listings.

### 👥 Roommate Matching

* Create roommate preference profiles.
* Browse potential roommates.
* Contact other users.
* View detailed roommate profiles.

### 📊 Dashboard

* Acts as the central hub of the application.
* Provides quick navigation to all modules.
* Presents an organized overview of available services.

---

## Technologies Used

### Frontend

* React.js
* Vite
* React Router
* CSS

### Backend & Database

* Firebase Authentication
* Firebase Firestore

### Other Tools

* Git & GitHub
* npm
* Visual Studio Code

---

# Project Structure

```text
VAGABOND
│
├── Dashboard
├── Accommodation Module
├── Marketplace Module
├── Roommate Module
├── Shared Components
└── Firebase Integration
```

Each module is developed independently but integrated into a single React application.

---

# How to Run the Project

### 1. Clone the repository

```bash
git clone <repository-url>
```

---

### 2. Navigate to the project folder

```bash
cd Vagabond
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Configure Firebase

Create or update the Firebase configuration file with your project credentials.

```javascript
firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

---

### 5. Start the development server

```bash
npm run dev
```

---

### 6. Open the application

Visit:

```text
http://localhost:5173
```

---

# Future Scope

* AI-powered roommate recommendations.
* Integrated chat system.
* Online rent payment.
* Student verification using university email IDs.
* Maps and nearby services integration.
* Review and rating system.
* Real-time notifications.

---

# Team Contribution

The project is developed collaboratively, with each team member responsible for an independent module:

* **Dashboard & Integration** – Central navigation and project integration.
* **Accommodation Module** – Rental property management.
* **Marketplace Module** – Student buy-and-sell platform.
* **Roommate Module** – Roommate matching and communication.

---

This version is concise, professional, and suitable for a hackathon README or project submission document.
