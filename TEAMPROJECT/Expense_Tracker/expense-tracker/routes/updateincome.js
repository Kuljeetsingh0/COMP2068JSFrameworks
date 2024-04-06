const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

// GET route to render the update form for a specific income
router.get('/:id', async function(req, res, next) {
    const incomeId = req.params.id;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const income = await db.collection('Incomes').findOne({ _id: new ObjectId(incomeId) });
        
        client.close();
        res.render('updateincome', { income }); // Render a form to update the income
    } catch (err) {
        console.error("Error fetching income for update:", err);
        res.status(500).send("Error fetching income for update");
    }
});

// POST route to handle the form submission for updating an income
router.post('/:id', async function(req, res, next) {
    const incomeId = req.params.id;
    const { date, amount, source, description } = req.body;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const result = await db.collection('Incomes').updateOne(
            { _id: new ObjectId(incomeId) },
            { $set: { date: new Date(date), amount: parseFloat(amount), source, description } }
        );
        console.log("Income updated successfully");
        
        client.close();
        res.redirect('/income'); // Redirect to incomes page after updating
    } catch (err) {
        console.error("Error updating income:", err);
        res.status(500).send("Error updating income");
    }
});

// POST route to handle deleting an income
router.post('/:id/delete', async function(req, res, next) {
    const incomeId = req.params.id;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const result = await db.collection('Incomes').deleteOne({ _id: new ObjectId(incomeId) });
        console.log("Income deleted successfully");
        
        client.close();
        res.redirect('/income'); // Redirect to incomes page after deleting
    } catch (err) {
        console.error("Error deleting income:", err);
        res.status(500).send("Error deleting income");
    }
});

module.exports = router;
