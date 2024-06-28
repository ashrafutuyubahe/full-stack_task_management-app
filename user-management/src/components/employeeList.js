import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import  EmplyeeImg from "./imployee.jpg"
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewDetails, setViewDetails] = useState({});
     
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:3002/getall')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3002/removeTask/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchEmployees();
        } else {
          console.error('Failed to delete employee');
        }
      })
      .catch(error => console.error('Error deleting employee:', error));
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdate = (updatedEmployee) => {
    fetch(`http://localhost:3002/updateTask/${updatedEmployee._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then(response => {
        if (response.ok) {
          setIsEditing(false);
          setSelectedEmployee(null);
          fetchEmployees();
        } else {
          console.error('Failed to update employee');
        }
      })
      .catch(error => console.error('Error updating employee:', error));
  };

  const toggleViewDetails = (id) => {
    setViewDetails(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Employee List</h2>
      {isEditing ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleUpdate}
          onCancel={() => {
            setIsEditing(false);
            setSelectedEmployee(null);
          }}
        />
      ) : (
        <div className="row">
          {employees.map(employee => (
            <div className="col-md-6" key={employee._id}>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={EmplyeeImg} className="card-img" alt="Employee" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Name: {employee.firstName} {employee.lastName}</h5>
                      <p className="card-text">Postion: {employee.position}</p>
                      <button className="btn btn-primary btn-sm mr-2 " onClick={() => handleEdit(employee)}>Edit</button>
                      <button className="btn btn-danger btn-sm mr-2 m-2" onClick={() => handleDelete(employee._id)}>Delete</button>
                      <button className="btn btn-info btn-sm m-2" onClick={() => toggleViewDetails(employee._id)}>
                        {viewDetails[employee._id] ? 'Hide Details' : 'View All'}
                      </button>
                      {viewDetails[employee._id] && (
                        <div className="mt-3">
                          <p>Title: {employee.title}</p>
                          <p>Company: {employee.company}</p>
                          <p>Business: {employee.business}</p>
                          <p>Employees: {employee.employees}</p>
                          <p>Street: {employee.street}</p>
                          <p>Additional: {employee.additional}</p>
                          <p>Zip: {employee.zip}</p>
                          <p>Place: {employee.place}</p>
                          <p>Country: {employee.country}</p>
                          <p>Code: {employee.code}</p>
                          <p>Phone: {employee.phone}</p>
                          <p>Email: {employee.email}</p>
                          <p>Checkbox: {employee.checkbox ? 'Checked' : 'Unchecked'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: employee ? employee.title : '',
    firstName: employee ? employee.firstName : '',
    lastName: employee ? employee.lastName : '',
    position: employee ? employee.position : '',
    company: employee ? employee.company : '',
    business: employee ? employee.business : '',
    employees: employee ? employee.employees : '',
    street: employee ? employee.street : '',
    additional: employee ? employee.additional : '',
    zip: employee ? employee.zip : '',
    place: employee ? employee.place : '',
    country: employee ? employee.country : '',
    code: employee ? employee.code : '',
    phone: employee ? employee.phone : '',
    email: employee ? employee.email : '',
    checkbox: employee ? employee.checkbox : false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...employee, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-row">
        {Object.keys(formData).map((key) => (
          <div className="form-group col-md-6" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            {key === 'checkbox' ? (
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <input
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-control"
              />
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary m-3">Save</button>
      <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EmployeeList;
