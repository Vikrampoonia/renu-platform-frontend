## I use free sql for host mysql it give 5MB storage for free.

# School Management Mini-Project

A full-stack web application for managing school data, featuring a Next.js frontend and an Express.js backend. Users can add new schools with image uploads, view a list of all schools, and search for specific schools.

---

## 🚀 Live URLs

* **Frontend (Next.js):** [Visit the Live Application](https://your-frontend-url.vercel.app)
* **Backend (Express.js):** [renu-platform-backend.vercel.app](https://renu-platform-backend.vercel.app)

## 📦 Repositories

* **Backend GitHub Repo:** [https://github.com/Vikrampoonia/renu-platform-backend.git](https://github.com/Vikrampoonia/renu-platform-backend.git)

---

## ✨ Features

* **Add Schools:** A user-friendly form to add new schools to the database, including image uploads.
* **View Schools:** Displays all registered schools in a clean, card-based layout.
* **Search Functionality:** A real-time search bar to filter schools by name, city, state, email, or contact number.
* **Pagination:** A simple and effective pagination system to handle a large number of schools.
* **Responsive Design:** The application is fully responsive and works on both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Form Management:** React Hook Form
* **Validation:** Zod

### Backend

* **Framework:** Express.js
* **Language:** JavaScript (Node.js)
* **Database:** MySQL
* **File Uploads:** Multer

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js (v16 or higher)
* MySQL

### Backend Setup

1.  **Clone the backend repository:**
    ```bash
    git clone [https://github.com/Vikrampoonia/renu-platform-backend.git](https://github.com/Vikrampoonia/renu-platform-backend.git)
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd renu-platform-backend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up the database:**
    * Create a MySQL database and table inside it schools
    
5.  **Create a `.env` file:**
    * Create a `.env` file in the root of the backend folder and add your database connection string:
        ```env
        DATABASE_URL=your connection string
        ```
6.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:8000`.

### Frontend Setup

1.  **Clone the frontend repository (if it's separate):**
    ```bash
    # git clone [frontend-repo-url](https://github.com/Vikrampoonia/renu-platform-frontend.git)
    # cd renu-platform-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:3000`.

---

## 📝 API Endpoints

The backend exposes the following API endpoints:

### Get All Schools

* **Method:** `GET`
* **URL:** `/schools`
* **Description:** Fetches a list of all schools.

### Add a New School

* **Method:** `POST`
* **URL:** `/create` (or your chosen endpoint)
* **Description:** Adds a new school to the database. Expects a `multipart/form-data` payload.

---

## ☁️ Deployment

* The **frontend** is deployed on **Vercel**.
* The **backend** is deployed on **Vercel** as a serverless function.
* The `vercel.json` file in the frontend repository handles the proxying of API requests to the live backend.
