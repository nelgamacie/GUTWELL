const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const calendarEntrySchema = require('./models/calenderEntrySchema');

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);

const port = 4000;
const uri = "mongodb+srv://sdaher3:KyfCS3s2qiCxCEJO@cluster0.1xadv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
});

// Routes

/**
 * Create or update a calendar entry.
 * If an entry for the date exists, it will update the entry.
 * If no entry exists, it will create a new one.
 */
app.post('/api/calendar-entries', async (req, res) => {
  try {
    const formattedDate = new Date(req.body.date).toISOString().split("T")[0];

    // Try to find an existing entry for the date
    let entry = await CalendarEntry.findOne({ date: formattedDate });

    if (entry) {
      // Update the existing entry
      entry.journalEntry = req.body.journalEntry;
      entry.flareFlag = req.body.flareFlag;
      entry.mood = req.body.mood;
      entry.appointments = req.body.appointments;
    } else {
      // Create a new entry
      entry = new CalendarEntry({
        ...req.body,
        date: formattedDate, // Ensure consistent date format
      });
    }

    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(400).json({ message: err.message });
  }
});

/**
 * Get all calendar entries.
 */
app.get('/api/calendar-entries', async (req, res) => {
  try {
    const entries = await CalendarEntry.find();
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get a calendar entry by date.
 */
app.get('/api/calendar-entries/:date', async (req, res) => {
  try {
    const formattedDate = new Date(req.params.date).toISOString().split("T")[0];
    const entry = await CalendarEntry.findOne({ date: formattedDate });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (err) {
    console.error("Error fetching entry by date:", err);
    res.status(500).json({ message: err.message });
  }
});
