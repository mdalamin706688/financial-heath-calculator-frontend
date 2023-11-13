import React, { useState } from 'react';
import axios from '../Services/api';
import { useNavigate } from 'react-router-dom';
import './SubmitFinancialData.css'; // Import your submit financial data page styles

const SubmitFinancialData = () => {
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [debts, setDebts] = useState('');
  const [assets, setAssets] = useState('');
  const [score, setScore] = useState(null); // State to store the score

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from storage
      const response = await axios.post(
        '/financial-data/submit',
        { monthlyIncome, monthlyExpenses, debts, assets },
        { headers: { Authorization: token } }
      );
      console.log(response.data);

      // Extract and set the score from the response
      const newScore = response.data.score;
      setScore(newScore);

      // Redirect to the financial data view page
      navigate('/financial-data/view');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="submit-financial-data-container">
      <h2>Submit Financial Data</h2>
      <div className="input-group">
        <label>Monthly Income</label>
        <input type="number" placeholder="Enter your monthly income" onChange={(e) => setMonthlyIncome(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Monthly Expenses</label>
        <input type="number" placeholder="Enter your monthly expenses" onChange={(e) => setMonthlyExpenses(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Debts</label>
        <input type="number" placeholder="Enter your debts" onChange={(e) => setDebts(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Assets</label>
        <input type="number" placeholder="Enter your assets" onChange={(e) => setAssets(e.target.value)} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display the score if available */}
      {score !== null && (
        <div className="score-container">
          <p>Your Financial Health Score:</p>
          <p className="score">{score}</p>
        </div>
      )}
    </div>
  );
};

export default SubmitFinancialData;
