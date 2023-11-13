// Import React and necessary dependencies

import React, { useEffect, useState } from "react";
import axios from "../Services/api";
import { Link } from "react-router-dom";
import "./ViewFinancialData.css"; // Import your financial data view page styles

const ViewFinancialData = () => {
  const [financialData, setFinancialData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Check if the token exists (or your authentication condition)
        if (token) {
          setIsLoggedIn(true);
          const response = await axios.get("/financial-data/get", {
            headers: { Authorization: token },
          });
          console.log(response.data);
          setFinancialData(response.data.data);
          // Handle success
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="submit-button-container">
          {/* Always show the Submit button */}
          <Link to="/financial-data/submit" className="submit-button">
            Calculate Your Financial Health Score
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="login-button-container">
              {/* Show Logout button when logged in */}
              <Link to="/" className="logout-button">
                Logout
              </Link>
            </div>
          ) : (
            <div className="login-button">
              {/* Show Login button when not logged in */}
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>

      <div className="financial-data-container">
        {financialData.map((dataEntry, index) => (
          <div key={index} className="financial-data-card">
            <h3>Financial Data #{index + 1}</h3>
            <div className="data-item">
              <span className="data-label">Monthly Income:</span>
              <span className="data-value">${dataEntry.monthlyIncome}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Monthly Expenses:</span>
              <span className="data-value">${dataEntry.monthlyExpenses}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Debts:</span>
              <span className="data-value">${dataEntry.debts}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Assets:</span>
              <span className="data-value">${dataEntry.assets}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Score:</span>
              <span className="data-value">{dataEntry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewFinancialData;
