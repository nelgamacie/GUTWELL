const mongoose = require('mongoose');

// Food schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isTrigger: { type: Boolean, default: false },
});

// Main calendar entry schema
const calendarEntrySchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    journalEntry: { type: String },
    foods: [foodSchema],
    flareFlag: { type: Boolean, default: false },
    mood: { type: Number, min: 1, max: 5 },
});

// Export the schema
module.exports = calendarEntrySchema;
