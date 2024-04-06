const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-trackery";
const dbName = 'Expense-tracker';

// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Generate CSV data from expenses
function generateCSVData(expenses) {
    let csvData = 'Date,Amount,Category,Notes\n'; // CSV header row

    expenses.forEach(expense => {
        csvData += `${expense.date},${expense.amount},${expense.category},${expense.notes}\n`; // Add expense data
    });

    return csvData;
}

// Display expenses
router.get('/', async function(req, res, next) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const expenses = await db.collection('Expences').find().toArray();

        // Format dates before rendering
        expenses.forEach(expense => {
            expense.date = formatDate(expense.date);
        });

        client.close();
        res.render('expenses', { expenses }); // Render a view with the expenses data
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).send("Error fetching expenses");
    }
});

// Download expenses as CSV
router.get('/download', async function(req, res, next) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const expenses = await db.collection('Expences').find().toArray();

        // Generate CSV data
        const csvData = generateCSVData(expenses);

        // Set response headers for CSV download
        res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
        res.setHeader('Content-Type', 'text/csv');

        // Send CSV data as response
        res.send(csvData);

        client.close();
    } catch (err) {
        console.error("Error downloading expenses:", err);
        res.status(500).send("Error downloading expenses");
    }
});

// Delete an expense
router.post('/:id/delete', async function(req, res, next) {
    const expenseId = req.params.id;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const result = await db.collection('Expences').deleteOne({ _id: new ObjectId(expenseId) });
        console.log("Expense deleted successfully");
        client.close();
        res.redirect('/expenses');
    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).send("Error deleting expense");
    }
});

module.exports = router;
