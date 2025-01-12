import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './tracker.css';

function Tracker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [tags, setTags] = useState(['Flare Started']);
  const [newTag, setNewTag] = useState('');
  const [mood, setMood] = useState(3);
  const [appointments, setAppointments] = useState([]); // Start with no appointments
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentDescription, setNewAppointmentDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const addTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

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
              onChange={(date) => setSelectedDate(new Date(date).toISOString().split('T')[0])}
              value={new Date()}
            />
          </div>
        </div>
      ) : (
        <div className="tracker-details">
          <div className="card calendar-small">
            <h2>Calendar</h2>
            <Calendar
              onChange={(date) => setSelectedDate(new Date(date).toISOString().split('T')[0])}
              value={new Date(selectedDate)}
            />
          </div>

          <div className="journal-section">
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

            <label>Tags:</label>
            <ul className="tags-list">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className={tag === selectedTag ? 'selected-tag' : ''}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button onClick={addTag}>Add Tag</button>

            <button className="back-button" onClick={() => setSelectedDate(null)}>
              Back to Main
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;