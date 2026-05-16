import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
}
from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Maintenance from "./pages/Maintenance";
import Sales from "./pages/Sales";
import Settings from "./pages/Settings";

import Login from "./pages/Login";


function Sidebar({ handleLogout }) {

  const location = useLocation();

  return (

    <div className="sidebar">


    <div className="sidebar-logo">
  
      <h1>AUTOELITE</h1>
  
      <p>
  
        VEHICLE MANAGEMENT SYSTEM
  
      </p>
  
    </div>
  
    <p className="sidebar-section-title">
  
      NAVIGATION
  
    </p>
  
    <div className="sidebar-links">
  
      <Link
        to="/"
        className={
          location.pathname === "/"
          ? "active-link"
          : ""
        }
      >
  
        📊 Dashboard
  
      </Link>
  
      <Link
        to="/vehicles"
        className={
          location.pathname === "/vehicles"
          ? "active-link"
          : ""
        }
      >
  
        🚗 Vehicles
  
      </Link>

      <Link
  to="/customers"
  className={
    location.pathname === "/customers"
    ? "active-link"
    : ""
  }
>

  👥 Customers

</Link>

<Link
  to="/bookings"
  className={
    location.pathname === "/bookings"
    ? "active-link"
    : ""
  }
>

  📅 Bookings

</Link>

      <Link
        to="/maintenance"
        className={
          location.pathname === "/maintenance"
          ? "active-link"
          : ""
        }
      >
  
        🔧 Maintenance
  
      </Link>

      <Link
  to="/sales"
  className={
    location.pathname === "/sales"
    ? "active-link"
    : ""
  }
>

  💰 Sales

</Link>
  
      <Link
        to="/settings"
        className={
          location.pathname === "/settings"
          ? "active-link"
          : ""
        }
      >
  
        ⚙️ Settings
  
      </Link>
  
    </div>
  
    <div className="admin-profile">
  
      <div className="admin-avatar">
  
        AD
  
      </div>
  
      <div>
  
        <h3>Admin User</h3>
  
        <p>Super Admin</p>
  
      </div>
  
    </div>
  
    <button
      className="logout-btn"
      onClick={handleLogout}
    >
  
      Logout
  
    </button>
  
  </div>

  );

}

function App() {

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchCars();

  }, []);

  const fetchCars = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/cars"
      );

      setCars(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const totalCars = cars.length;

  const totalBrands = new Set(
    cars.map((car) => car.brand)
  ).size;

  const totalValue = cars.reduce(
    (sum, car) => sum + Number(car.price),
    0
  );

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  const isLoginPage =
window.location.pathname === "/login";

const handleLogout = () => {

  localStorage.removeItem(
      "isLoggedIn"
  );

  window.location.href = "/login";

};

  return (

    <BrowserRouter>

      <div className="app-layout">

      {!isLoginPage && (

<Sidebar
  handleLogout={handleLogout}
/>

      )}

        <div className="main-content">

          <Routes>

          <Route
           path="/login"
            element={<Login />}
            />

<Route
    path="/"
    element={

        localStorage.getItem("isLoggedIn")

        ?

        <Dashboard
            totalCars={totalCars}
            totalBrands={totalBrands}
            totalValue={totalValue}
            filteredCars={filteredCars}
        />

        :

        <Navigate to="/login" />

    }
/>

            <Route
              path="/vehicles"
              element={
                <Vehicles
                  cars={cars}
                  fetchCars={fetchCars}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />

<Route
  path="/customers"
  element={
    <Customers
      cars={cars}
    />
  }
/>

<Route
  path="/bookings"
  element={
    <Bookings
      cars={cars}
    />
  }
/>

            <Route
              path="/maintenance"
              element={<Maintenance
                cars={cars}
                fetchCars={fetchCars}
              />}
            />

<Route
  path="/sales"
  element={
    <Sales
      cars={cars}
    />
  }
/>

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;