const express = require('express');
const router = express.Router();
const Employee = require('../model/userdetailmodel');


router.post('/addtask', async (req, res) => {
  try {

    const employee = new Employee(req.body);
    console.log(req.body);
    await employee.save();
    res.status(201).send("task added successfull");
  } catch (error) {
    res.status(400).send(error);
  }
});



router.get('/gettasks', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'position', 'company', 'businessArena', 'employees', 'zipCode', 'place', 'country', 'phoneNumber', 'email'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }

    updates.forEach(update => employee[update] = req.body[update]);
    await employee.save();

    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
