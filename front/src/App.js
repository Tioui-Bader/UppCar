import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from './component/home/Home';
import Login from './component/login/Login';
import Registre from './component/registre/Registre';

import Loginagence from './component/loginagence/Loginagence';
import Registreagence from './component/registreagence/Registreagence';

import HomeConnect from './component/homeConnected/HomeConnect';
import Homeagence from './component/homeagence/Homeagence';
import Profile from './component/profile/Profile';
import Favorites from './component/favorites/Favorites';
import CarDetails from './component/carDetails/CarDetails';
import BookingAgreement from './component/bookingAgreement/BookingAgreement';


function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");


  if (!token) {
    return <Navigate to={role === "agence" ? "/loginagence" : "/login"} replace />;
  }


  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ accès autorisé
  return children;
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* 🔓 ROUTES PUBLIQUES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registre" element={<Registre />} />

          <Route path="/loginagence" element={<Loginagence />} />
          <Route path="/registreagence" element={<Registreagence />} />

          {/* 👤 USER */}
          <Route
            path="/homeConnect"
            element={
              <PrivateRoute role="user">
                <HomeConnect />
              </PrivateRoute>
            }
          />

          <Route
            path="/car/:id"
            element={
              <PrivateRoute role="user">
                <CarDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <PrivateRoute role="user">
                <BookingAgreement />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute role="user">
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <PrivateRoute role="user">
                <Favorites />
              </PrivateRoute>
            }
          />


          {/* 🏢 AGENCE */}
          <Route
            path="/homeagence"
            element={
              <PrivateRoute role="agence">
                <Homeagence />
              </PrivateRoute>
            }
          />

          {/* 🚫 ROUTE INCONNUE */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;