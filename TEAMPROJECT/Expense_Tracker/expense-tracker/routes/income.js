const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Generate CSV data from incomes
function generateCSVData(incomes) {
    let csvData = 'Date,Amount,Category,Description\n'; // CSV header row

    incomes.forEach(income => {
        csvData += `${income.date},${income.amount},${income.category},${income.description}\n`; // Add income data
    });

    return csvData;
}

// Display incomes
router.get('/', async function(req, res, next) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const incomes = await db.collection('Incomes').find().toArray();
        
        // Format dates before rendering
        incomes.forEach(income => {
            income.date = formatDate(income.date);
        });

        client.close();
        res.render('income', { incomes }); // Render a view with the incomes data
    } catch (err) {
        console.error("Error fetching incomes:", err);
        res.status(500).send("Error fetching incomes");
    }
});

// Download incomes as CSV
router.get('/download', async function(req, res, next) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const incomes = await db.collection('Incomes').find().toArray();

        // Generate CSV data
        const csvData = generateCSVData(incomes);

        // Set response headers for CSV download
        res.setHeader('Content-Disposition', 'attachment; filename="incomes.csv"');
        res.setHeader('Content-Type', 'text/csv');

        // Send CSV data as response
        res.send(csvData);

        client.close();
    } catch (err) {
        console.error("Error downloading incomes:", err);
        res.status(500).send("Error downloading incomes");
    }
});

// Delete an income
router.post('/:id/delete', async function(req, res, next) {
    const incomeId = req.params.id;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const result = await db.collection('Incomes').deleteOne({ _id: new ObjectId(incomeId) });
        console.log("Income deleted successfully");
        client.close();
        res.redirect('/income'); // Redirect to incomes page after deletion
    } catch (err) {
        console.error("Error deleting income:", err);
        res.status(500).send("Error deleting income");
    }
});

module.exports = router;
