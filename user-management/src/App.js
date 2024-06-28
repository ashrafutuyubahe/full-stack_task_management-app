import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeForm from './components/detailForm';
import EmployeeList from "./components/employeeList";


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <header className="row">
          <nav className="col">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color: 'white' }}>Add Employees</Link>
              </li>
              <li className="nav-item">
                <Link to="/employees"style={{ color: 'white' }} className="nav-link">View Employees</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="row justify-content-center">
          <Routes className="col-md-8">
            <Route path="/" element={<EmployeeForm />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/add-employee" element={<EmployeeForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
