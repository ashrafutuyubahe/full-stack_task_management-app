const express = require("express");
const bodyParser = require("body-parser");
const dbconnection = require('./dbconnection');
const cors = require("cors");
const Employee = require('./model/userdetailmodel');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: "http://localhost:3000",
    extended: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// POST endpoint to add a task
app.post("/addtask", async (req, res) => {
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
            res.status(201).send("Task added successfully");
        } else {
            res.status(500).send("Failed to add task");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET endpoint to get data by ID
app.get('/gettask/:id', async (req, res) => {
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

// DELETE endpoint to delete data by ID
app.delete('/deletetask/:id', async (req, res) => {
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

// PUT endpoint to update data by ID
app.put('/updatetask/:id', async (req, res) => {
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
            res.status(200).json(updatedEmployee);
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
