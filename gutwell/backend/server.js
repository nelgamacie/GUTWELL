const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express(); // Create an instance of Express
const port = 3000; // Define the port
const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string

// Middleware
app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
    // Connect to MongoDB
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...hellooo'))
        .catch(err => {
            console.error('Could not connect to MongoDB...', err);
        });
});
