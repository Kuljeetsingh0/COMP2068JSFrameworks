# Expense Tracker

Expense Tracker is a web application built with Node.js, Express, MongoDB/Mongoose, and HBS views. It allows users to manage their expenses and income, as well as provides authentication functionality for user registration and login. Additionally, users can download their expense and income data in CSV format.

## Live Site
The Expense Tracker application is hosted live on Render.

[Live Site](https://your-live-site-url)



## Features
1. **Authentication**
   - Users can register for a new account.
   - Registered users can log in with their credentials.
   - Users can also log in with their GitHub account.

2. **CRUD Operations**
   - Users can view, add, edit, and delete their expenses.
   - Users can view, add, edit, and delete their income.

3. **Additional Feature**
   - **Download Expense and Income Data:** Users can download their expense and income data in CSV format for further analysis.

## Implementation Details
- **Project Template and Home Page:** Implemented a professional-looking home page with a custom design using HBS templating engine and CSS. Used a Bootstrap template for styling.
- **Authentication:** Implemented user registration and login functionality. Users can log in with their email/password or with their GitHub account.
- **CRUD Operations:** Set up MongoDB database on MongoDB Atlas. Implemented CRUD functionality for both expenses and income. Database credentials are stored in a config file.
- **Additional Feature - Download CSV:** Implemented a feature to download expense and income data in CSV format. Users can click a button to download their data.
- **Commenting:** Provided code comments for better understanding of the application. Described the additional feature in the README file.
- **Version Control:** Made multiple commits with descriptive messages to the GitHub repository.
- **Cloud Deployment:** Deployed the application to Render for live hosting.

## Installation and Usage
To run the Expense Tracker application locally:

1. Clone the GitHub repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database either locally or on MongoDB Atlas.
4. Update the database credentials in the config file.
5. Run the application using `npm start`.
6. Access the application in your web browser at http://localhost:3002.

## Credits
- Bootstrap Template: Start Bootstrap - SB Admin 2
- MongoDB/Mongoose Documentation
- Express Documentation
- HBS Documentation

## License
This project is licensed under the MIT License - see the LICENSE file for details.
