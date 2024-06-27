import React, { useEffect, useState } from 'react';
import '../app.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
    fetch(`http://localhost:5000/delete/${id}`, {
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
    fetch(`http://localhost:5000/update/${updatedEmployee._id}`, {
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

  return (
    <div>
      <h2>Employee List</h2>
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
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              {employee.name} - {employee.position}
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee ? employee.name : '',
    position: employee ? employee.position : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...employee, ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EmployeeList;
