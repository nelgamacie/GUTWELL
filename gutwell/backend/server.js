const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    // Connect to MongoDB
    mongoose.connect(uri)
        .then(() => console.log('Connected to MongoDB...hellooo'))
        .catch(err => {
            console.error('Could not connect to MongoDB...', err);
        });
  });