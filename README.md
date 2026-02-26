# Zovo Marketplace 🛒

> A full-stack **MERN (MongoDB, Express, React, Node.js)** marketplace application connecting Customers with Service Professionals (Electricians, Plumbers, Stylists, etc.).

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=react)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌐 Live Demo

- **Frontend (App)**: [https://AKrishnaK05.github.io/Zovo-Marketplace/](https://AKrishnaK05.github.io/Zovo-Marketplace/)
- **Backend (API)**: [https://zovo-marketplace.onrender.com](https://zovo-marketplace.onrender.com)
  _(Note: The backend is hosted on Render's free tier. It may take ~30 seconds to wake up on the first request.)_

---

## ✨ Key Features

### 👤 User Roles
- **Customers**: Browse services, book appointments, track job status, rate workers.
- **Workers**: Create profiles, set availability, accept/reject jobs, view earnings.
- **Admin**: Dashboard for managing users, jobs, pricing rules, and service categories.

### 🛠️ Core Functionality
- **Authentication**: Secure JWT Auth (Login/Register) & Google OAuth.
- **Real-Time Updates**: Socket.IO integration for live job status changes (Pending -> In Progress -> Completed).
- **Smart Booking**: Dynamic pricing calculation based on service type and duration.
- **Location Intelligence**: Location-based service matching and clustering.
- **AI-Powered Matching**: Custom-built LightGBM model for intelligent worker dispatching and recommendation, supported by a robust data engineering pipeline and Jupyter notebooks for training and evaluation.

---

## 💻 Tech Stack

### Frontend
- **React.js (Vite)**: Fast, modern UI library.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **React Router DOM**: Client-side routing.
- **Socket.io-client**: Real-time communication.
- **Axios**: API requests.

### Backend
- **Node.js & Express**: Robust RESTful API.
- **MongoDB Atlas**: Cloud NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Socket.io**: Real-time event server.
- **JWT**: Secure authentication.

### Machine Learning & Data
- **LightGBM / Scikit-learn**: Gradient boosting framework for the intelligent dispatch model.
- **Jupyter Notebooks**: For dataset generation, model training, and evaluation pipelines.
- **Pandas**: Data preprocessing and feature engineering.

### DevOps & Deployment
- **Frontend**: GitHub Pages (via GitHub Actions).
- **Backend**: Render.com (Auto-deploy from Main branch).
- **Monorepo**: Single repository managing both `zovo-frontend` and `zovo-backend`.

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/AKrishnaK05/Zovo-Marketplace.git
    cd Zovo-Marketplace
    ```

2.  **Backend Setup**
    ```bash
    cd zovo-backend
    npm install
    
    # Create .env file
    # PORT=8080
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    # GOOGLE_CLIENT_ID=... (Optional)
    
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd ../zovo-frontend
    npm install
    
    # Create .env file
    # VITE_API_BASE_URL=http://localhost:8080/api
    # VITE_SOCKET_URL=http://localhost:8080
    
    npm run dev
    ```

---

## 📂 Project Structure

```bash
Zovo-Marketplace/
├── zovo-backend/       # Node.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/   # Business logic (Pricing, AI)
│   │   └── app.js      # Express App Setup
│   └── server.js       # Entry Point
│
├── ml-models/          # Trained ML models (LightGBM) for dispatching
├── notebooks/          # Jupyter notebooks (Training, Evaluation, Dataset Creation)
├── data/               # Raw, processed data and caches
├── utils/              # ML feature engineering scripts
│
├── zovo-frontend/      # React App
│   ├── src/
│   │   ├── components/ # Reusable UI
│   │   ├── contexts/   # Auth & Data State
│   │   ├── pages/      # Route Components
│   │   └── services/   # API Integration
│   └── vite.config.js
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

### Developed by **[Adwaid Krishna K](https://github.com/AKrishnaK05)** 
