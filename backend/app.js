const express = require("express");
const bodyParser = require("body-parser");
const dbconnection = require("./dbconnection");
const cors = require("cors");
const Employee = require("./model/userdetailmodel");
const validateEmployee = require('./middleware/userauth');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    extended: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.post("/addTask", validateEmployee,async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      position,
      company,
      business,
      employees,
      street,
      additional,
      zip,
      place,
      country,
      code,
      phone,
      email,
      checkbox,
    } = req.body;

    const employee = new Employee({
      title,
      firstName,
      lastName,
      position,
      company,
      business,
      employees,
      street,
      additional,
      zip,
      place,
      country,
      code,
      phone,
      email,
      checkbox,
    });

    console.log(req.body);
    const savedEmployee = await employee.save();
    if (savedEmployee) {
      res.status(201).send("  employee  added successfully");
    } else {
      res.status(500).send("Failed to add task");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/getall", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/getTask/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/removeTask/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.status(200).send("Task deleted successfully");
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/updateTask/:id", async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      position,
      company,
      business,
      employees,
      street,
      additional,
      zip,
      place,
      country,
      code,
      phone,
      email,
      checkbox,
    } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        title,
        firstName,
        lastName,
        position,
        company,
        business,
        employees,
        street,
        additional,
        zip,
        place,
        country,
        code,
        phone,
        email,
        checkbox,
      },
      { new: true }
    );

    if (updatedEmployee) {
      res.status(200).send("task updated successfully");
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
