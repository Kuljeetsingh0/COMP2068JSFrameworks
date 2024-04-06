const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

// Add bodyParser middleware to parse request body
router.use(bodyParser.urlencoded({ extended: true }));

// Display income creation page
router.get('/', function(req, res, next) {
    res.render('addIncome');
});

// Handle income creation form submission
router.post('/', async function(req, res, next) {
    try {
        const { date, amount, source, description } = req.body;

        // Validate form data (client-side and/or server-side validation)

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const incomeObj = {
            date: new Date(date),
            amount: parseFloat(amount),
            source,
            description
        };

        // Use correct collection name 'Incomes'
        const result = await db.collection('Incomes').insertOne(incomeObj);

        console.log("Income added successfully");
        client.close();
        res.redirect('/addIncome'); // Redirect to home page or any other page
    } catch (err) {
        console.error("Error handling income creation:", err);
        res.status(500).send("Error handling income creation");
    }
});

module.exports = router;
