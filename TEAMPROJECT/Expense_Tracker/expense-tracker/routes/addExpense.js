const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

// Add bodyParser middleware to parse request body
router.use(bodyParser.urlencoded({ extended: true }));

// Display expense creation page
router.get('/', function(req, res, next) {
    res.render('addExpense');
});

// Handle expense creation form submission
router.post('/', async function(req, res, next) {
    try {
        const { date, amount, category, description } = req.body;

        // Validate form data (client-side and/or server-side validation)

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const expenseObj = {
            date: new Date(date),
            amount: parseFloat(amount),
            category,
            description
        };

        // Use correct collection name 'Expenses'
        const result = await db.collection('Expences').insertOne(expenseObj);

        console.log("Expense added successfully");
        client.close();
        res.redirect('/addExpense'); // Redirect to home page or any other page
    } catch (err) {
        console.error("Error handling expense creation:", err);
        res.status(500).send("Error handling expense creation");
    }
});

module.exports = router;
