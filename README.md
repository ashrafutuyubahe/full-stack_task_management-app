# Employee Task CRUD Application
This project implements a CRUD (Create, Read, Update, Delete) API for managing employee tasks using Express.js and MongoDB.
# Prerequisites
Before running the application, ensure you have the following installed:

1. Node.js
2. MongoDB

# Getting Started 
1.Clone the repository:

git clone (https://github.com/ashrafutuyubahe/full-stack_task_management-app)
cd your repository directory

2.Install dependencies
npm install

3.Set up MongoDB
Ensure MongoDB is running locally or adjust the connection settings in dbconnection.js.

4.Start the server:
npm start

# API Endpoints of api

## POST /addTask

Creates a new employee task.
Requires a JSON body with employee details.

## GET /getall

Retrieves all employee tasks.

## GET /getTask/:id

Retrieves a specific employee task by ID.

## DELETE /removeTask/:id

Deletes a specific employee task by ID.

## PUT /updateTask/:id

Updates a specific employee task by ID.
Requires a JSON body with updated employee details.

# Usage
To interact with the API, you can use tools like Postman or directly integrate with your frontend application (running on http://localhost:3000, assuming React).
# Contributing
  I warmly welcome contributions! Please fork the repository and submit pull requests.
# License
This project is licensed under the MIT License.
