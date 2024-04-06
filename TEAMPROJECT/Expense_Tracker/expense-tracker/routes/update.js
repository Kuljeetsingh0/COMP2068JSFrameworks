const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

router.get('/:id', async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid expense id");
        }

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        
        const expense = await db.collection('Expences').findOne({ _id: new ObjectId(req.params.id) });

        client.close();

        if (!expense) {
            return res.status(404).send("Expense not found");
        }

        // Render update.hbs directly without specifying any layout
        res.render('update', { expense });
    } catch (err) {
        console.error("Error fetching expense:", err);
        res.status(500).send("Error fetching expense");
    }
});

router.post('/:id', async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid expense id");
        }

        const { date, amount, category, description } = req.body;

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const expenseObj = {
            date: new Date(date),
            amount: parseFloat(amount),
            category,
            description
        };

        const result = await db.collection('Expences').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: expenseObj }
        );

        console.log("Expense updated successfully");
        client.close();
        res.redirect('/expenses'); // Redirect to home page or any other page
    } catch (err) {
        console.error("Error handling expense update:", err);
        res.status(500).send("Error handling expense update");
    }
});

module.exports = router;
