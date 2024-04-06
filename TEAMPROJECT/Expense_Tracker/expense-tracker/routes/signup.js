const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

router.get('/', function(req, res, next) {
    res.render('signup');
});

router.post('/', async function(req, res, next) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const { username, email, password } = req.body;
        
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object with hashed password
        const userObj = { username, email, password: hashedPassword };

        const result = await db.collection('users').insertOne(userObj);

        if (result && result.insertedCount !== undefined) {
            if (result.insertedCount > 0) {
                console.log("User was successfully inserted:", result.ops[0]);
            } else {
                console.error("No documents inserted.");
                console.log("Full result object:", result);
            }
        } else {
            console.error("Error: 'insertedCount' property is missing from the result object.");
            console.log("Full result object:", result);
        }

        client.close();
        res.render('login');
    } catch (err) {
        console.error("Error handling form submission:", err);
        res.status(500).send("Error handling form submission");
    }
});

module.exports = router;
