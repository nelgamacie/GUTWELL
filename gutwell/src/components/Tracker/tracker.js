import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './tracker.css';

function Tracker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [tags, setTags] = useState([]); // Flare reset for each date
  const [mood, setMood] = useState(3);
  const [appointments, setAppointments] = useState([]); // Start with no appointments
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentDescription, setNewAppointmentDescription] = useState('');

  const addAppointment = () => {
    if (newAppointmentDate.trim() !== '' && newAppointmentDescription.trim() !== '') {
      setAppointments([
        ...appointments,
        { date: newAppointmentDate, description: newAppointmentDescription },
      ]);
      setNewAppointmentDate('');
      setNewAppointmentDescription('');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).toISOString().split('T')[0]);
    setJournalEntry(''); // Reset journal entry
    setTags([]); // Reset tags (Flare checkbox)
    setMood(3); // Reset mood
  };

  const moodFaces = ['😢', '🙁', '😐', '🙂', '😄'];

  return (
    <div className="tracker">
      {!selectedDate ? (
        <div className="tracker-main">
          <div className="card appointments-card">
            <h2>Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p className="no-appointments">No upcoming appointments.</p>
            ) : (
              <ul className="appointments-list">
                {appointments.map((appt, index) => (
                  <li key={index} className="appointment-item">
                    <div className="appointment-info">
                      <span className="appointment-icon">📅</span>
                      <span className="appointment-date">{appt.date}</span>
                    </div>
                    <div className="appointment-info">
                      <span className="appointment-icon">🕒</span>
                      <span className="appointment-description">{appt.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h3>Add Appointment</h3>
            <input
              type="date"
              value={newAppointmentDate}
              onChange={(e) => setNewAppointmentDate(e.target.value)}
              placeholder="Date"
              className="input-date"
            />
            <input
              type="text"
              value={newAppointmentDescription}
              onChange={(e) => setNewAppointmentDescription(e.target.value)}
              placeholder="Description"
              className="input-text"
            />
            <button onClick={addAppointment} className="add-appointment-button">Add Appointment</button>
          </div>

          <div className="card calendar">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={new Date()}
            />
          </div>
        </div>
      ) : (
        <div className="tracker-details">
          <div className="card calendar-small">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={new Date(selectedDate)}
            />
          </div>

          <div className="journal-section">
            <button className="back-button" onClick={() => setSelectedDate(null)}>
              ← Back to Main
            </button>
            <h2>Tracking for {selectedDate}</h2>

            <div className="journal-entry">
              <label>Journal Entry:</label>
              <textarea
                className="large-textarea"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write your notes here..."
              ></textarea>
            </div>

            <div className="mood-section">
              <label>Mood:</label>
              <div className="mood-options">
                {moodFaces.map((face, index) => (
                  <span
                    key={index}
                    className={`mood-face ${mood === index + 1 ? 'selected-mood' : ''}`}
                    onClick={() => setMood(index + 1)}
                  >
                    {face}
                  </span>
                ))}
              </div>
              <p>Your mood: {moodFaces[mood - 1]}</p>
            </div>

            <div className="flare-section">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={tags.includes('Flare Started')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTags(['Flare Started']);
                    } else {
                      setTags([]);
                    }
                  }}
                />
                <span className="checkmark"></span>
                Flare Started
              </label>
            </div>

            <button className="save-button">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;