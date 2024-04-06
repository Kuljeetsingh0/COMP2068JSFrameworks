const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const url = "mongodb+srv://Kuljeet:Kuljeet@expense-tracker.rrfslhd.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";
const dbName = 'Expense-tracker';

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', async function(req, res, next) {
    try {
        console.log("Login route hit"); // Log to verify route execution
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const email = req.body.email;
        const password = req.body.password;

        console.log("Request body:", req.body); // Log request body to verify data

        // Find user by email
        console.log("Attempting to find user by email:", email);
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            // If user does not exist, render login page with an error message
            console.log("User not found for email:", email);
            client.close();
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Compare hashed password
        console.log("Comparing passwords...");
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // If password is incorrect, render login page with an error message
            console.log("Password does not match for user:", email);
            client.close();
            return res.render('login', { error: 'Invalid email or password' });
        }

        // If login is successful, redirect to the appropriate index page
        console.log("Login successful for user:", email);
        client.close();
        res.redirect('/index'); // Redirect to the appropriate index page

    } catch (err) {
        console.error("Error handling login:", err);
        res.status(500).send("Error handling login");
    }
});

module.exports = router;
