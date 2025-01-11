const mongoose = require('mongoose');

// MongoDB connection URI
const uri = "mongodb+srv://sdaher3:KyfCS3s2qiCxCEJO@cluster0.1xadv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...hellooo'))
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });
