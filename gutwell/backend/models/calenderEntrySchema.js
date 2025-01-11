const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the food
    isTrigger: { type: Boolean, default: false } // Whether it's a trigger food
});

const appointmentSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Appointment title
    date: { type: Date, required: true }, // Date and time of the appointment
    notes: { type: String } // Additional details about the appointment
});

const calendarEntrySchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true }, // Entry date, one per day
    journalEntry: { type: String }, // Free-text journal entry
    foods: [foodSchema], // Array of food items consumed that day
    flareFlag: { type: Boolean, default: false }, // Whether the day is marked as a flare day
    mood: { type: Number, min: 1, max: 5 }, // Mood scale from 1 (happy) to 5 (upset/painful)
    appointments: [appointmentSchema] // Array of upcoming appointments
});

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);

module.exports = CalendarEntry;
