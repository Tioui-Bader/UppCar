# 🚗 Car Rental Reservation System (MERN Stack)

A full-stack **Car Rental Reservation Application** built using the **MERN stack**: **MongoDB, Express.js, React.js, and Node.js**.
The platform allows users to browse available cars, make reservations, and manage bookings, while administrators can manage vehicles, reservations, and users.

---

# 📌 Features

## 👤 User Features

* Browse available cars
* View car details (price, availability, specifications)
* Make car reservations
* View reservation history
* Cancel or modify reservations
* User authentication (Register / Login)

## 🔑 Admin Features

* Add new cars
* Update car information
* Delete cars
* Manage reservations
* Manage users
* Dashboard with booking overview

---

# 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS / Bootstrap / Tailwind

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MongoDB
* Mongoose ODM

---

# 🏗️ Project Architecture

```
car-rental-app/
│
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── index.js
│
├── server/                 # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```
git clone https://github.com/your-username/car-rental-mern.git
cd car-rental-mern
```

---

## 2️⃣ Install backend dependencies

```
cd server
npm install
```

---

## 3️⃣ Install frontend dependencies

```
cd ../client
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/car_rental
JWT_SECRET=your_secret_key
```

---

# ▶️ Running the Application

### Start Backend

```
cd server
npm run dev
```

### Start Frontend

```
cd client
npm start
```

Frontend will run on:

```
http://localhost:3000
```

Backend API:

```
http://localhost:5000
```

---

# 📡 API Endpoints (Example)

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Cars

```
GET /api/cars
GET /api/cars/:id
POST /api/cars
PUT /api/cars/:id
DELETE /api/cars/:id
```

## Reservations

```
POST /api/reservations
GET /api/reservations
DELETE /api/reservations/:id
```

---

# 🗄️ Database Models

### User

```
name
email
password
role
```

### Car

```
name
brand
pricePerDay
availability
image
description
```

### Reservation

```
userId
carId
startDate
endDate
totalPrice
status
```

---

# 🔒 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

Workflow:

1. User logs in
2. Server generates a JWT token
3. Token is stored on the client
4. Protected routes verify the token

---

# 📸 Future Improvements

* Payment integration (Stripe / PayPal)
* Advanced search and filtering
* Car availability calendar
* Email notifications
* Admin analytics dashboard
* Reviews and ratings

---

# 🚀 Deployment

Possible deployment platforms:

Frontend:

* Vercel
* Netlify

Backend:

* Render
* Railway
* AWS

Database:

* MongoDB Atlas

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```
git checkout -b feature-name
```

3. Commit your changes

```
git commit -m "Add new feature"
```

4. Push to the branch

```
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

Developed as a **Full Stack MERN Application** for car rental reservations.
