import React, { useState } from 'react';
import '../app.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    business: '',
    employees: '',
    street: '',
    additional: '',   
    zip: '',
    place: '',
    country: '',
    code: '',
    phone: '',
    email: '',
    checkbox: false,
  });
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch("http://localhost:3002/addTask", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
      console.log(response)

        alert('Employee registered successfully');
      } else {
        console.log(response)
        alert('Failed to register employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="content-page">
      <div className="form-cont">
        <form className="form-detail" onSubmit={handleSubmit} id="myform">
          <div className="form-left">
            <h2>General Information</h2>
            <div className="form-row">
              <select name="title" value={formData.title} onChange={handleChange}>
                <option className="option" value="">Title</option>
                <option className="option" value="businessman">Businessman</option>
                <option className="option" value="reporter">Official</option>
                <option className="option" value="secretary">IT specialist</option>
              </select>
              <span className="select-btn">
                <i className="zmdi zmdi-chevron-down"></i>
              </span>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <input type="text" name="firstName" id="first_name" className="input-text" placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-row form-row-2">
                <input type="text" name="lastName" id="last_name" className="input-text" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <select name="position" value={formData.position} onChange={handleChange}>
                <option value="">Position</option>
                <option value="director">general director</option>
                <option value="self-employed">self employed</option>
              </select>
              <span className="select-btn">
                <i className="zmdi zmdi-chevron-down"></i>
              </span>
            </div>
            <div className="form-row">
              <input type="text" name="company" className="company" id="company" placeholder="Company" required value={formData.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <div className="form-row form-row-3">
                <input type="text" name="business" className="business" id="business" placeholder="Business Arena" required value={formData.business} onChange={handleChange} />
              </div>
              <div className="form-row form-row-4">
                <select name="employees" value={formData.employees} onChange={handleChange}>
                  <option value="">Employees</option>
                  <option value="colleague">private company</option>
                  <option value="associate">Governmental organization</option>
                </select>
                <span className="select-btn">
                  <i className="zmdi zmdi-chevron-down"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-right">
            <h2>Contact Details</h2>
            <div className="form-row">
              <input type="text" name="street" className="street" id="street" placeholder="Street + Nr" required value={formData.street} onChange={handleChange} />
            </div>
            <div className="form-row">
              <input type="text" name="additional" className="additional" id="additional" placeholder="Additional Information" required value={formData.additional} onChange={handleChange} />
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <input type="text" name="zip" className="zip" id="zip" placeholder="Zip Code" required value={formData.zip} onChange={handleChange} />
              </div>
              <div className="form-row form-row-2">
                <select name="place" value={formData.place} onChange={handleChange}>
                  <option value="">Place</option>
                  <option value="Street">Street</option>
                  <option value="District">District</option>
                  <option value="City">City</option>
                </select>
                <span className="select-btn">
                  <i className="zmdi zmdi-chevron-down"></i>
                </span>
              </div>
            </div>
            <div className="form-row">
              <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Country</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Malaysia">Malaysia</option>
                <option value="India">India</option>
              </select>
              <span className="select-btn">
                <i className="zmdi zmdi-chevron-down"></i>
              </span>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <input type="text" name="code" className="code" id="code" placeholder="Code +" required value={formData.code} onChange={handleChange} />
              </div>
              <div className="form-row form-row-2">
                <input type="text" name="phone" className="phone" id="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <input type="text" name="email" id="your_email" className="input-text" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" placeholder="Your Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-checkbox">
              <label className="container">
                <p>I do accept the <a href="#" className="text">Terms and Conditions</a> of your site.</p>
                <input type="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleChange} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="form-row-last">
              <input type="submit" name="register" className="register" value="Register Badge" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
