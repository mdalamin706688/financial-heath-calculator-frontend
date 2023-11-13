import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import SubmitFinancialData from "./components/FinancialData/Submit";
import ViewFinancialData from "./components/FinancialData/View";
import Home from "./components/Home/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you can use your authentication logic here)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate state={{ from: path }} replace to="/login" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Use PrivateRoute to protect the routes */}
        <Route
          path="/financial-data/submit"
          element={<PrivateRoute element={<SubmitFinancialData />} path="/financial-data/submit" />}
        />
        <Route
          path="/financial-data/view"
          element={<PrivateRoute element={<ViewFinancialData />} path="/financial-data/view" />}
        />

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
