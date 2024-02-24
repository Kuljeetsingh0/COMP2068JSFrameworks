const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// CREATE
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students/index', { students });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add routes for Update (PUT) and Delete (DELETE) here if needed

module.exports = router;





