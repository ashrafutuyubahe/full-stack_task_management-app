import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeForm from './components/detailForm';


import './app.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/employees">View Employees</Link></li>
             
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<EmployeeForm />} />
          {/* <Route path="/employees" element={<EmployeeList />} /> */}
          <Route path="/add-employee" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Welcome to the Employee Management System</h2>
    <p>Select a link from the navigation menu.</p>
  </div>
);

export default App;
