const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const calendarEntrySchema = require('./models/calenderEntrySchema');

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);


const port = 4000;
const uri = "mongodb+srv://sdaher3:KyfCS3s2qiCxCEJO@cluster0.1xadv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
    // Connect to MongoDB
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...hellooo'))
        .catch(err => {
            console.error('Could not connect to MongoDB...', err);
        });

});

// Routes

// Create a calendar entry
app.post('/api/calendar-entries', async (req, res) => {
    try {
        const newEntry = new CalendarEntry(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all calendar entries
app.get('/api/calendar-entries', async (req, res) => {
    try {
        const entries = await CalendarEntry.find();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a calendar entry by date
app.get('/api/calendar-entries/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const entry = await CalendarEntry.findOne({ date });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a calendar entry
app.put('/api/calendar-entries/:id', async (req, res) => {
    try {
        const updatedEntry = await CalendarEntry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a calendar entry
app.delete('/api/calendar-entries/:id', async (req, res) => {
    try {
        const deletedEntry = await CalendarEntry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

