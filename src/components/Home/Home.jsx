import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Financial Health Indicator Tool</h1>
        <p>Empowering small businesses for financial success.</p>
      </header>
      <section>
        <div className="cta-container">
          <h2>Unlock Your Financial Health Score</h2>
          <p>Understand and improve your business's financial health with our powerful tool.</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button">Login</Link>
            <Link to="/register" className="cta-button">Sign Up</Link>
          </div>
        </div>
      </section>
      <footer>
        <p>© 2023 Financial Health Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
