import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./tracker.css";

const API_URL = "http://localhost:4000/api/calendar-entries";

function Tracker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [tags, setTags] = useState([]);
  const [mood, setMood] = useState(3);
  const [appointments, setAppointments] = useState([]);
  const [newAppointmentDate, setNewAppointmentDate] = useState("");
  const [newAppointmentDescription, setNewAppointmentDescription] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch all calendar entries on load
  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle date selection
  const handleDateChange = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setSelectedDate(formattedDate);

    // Find the entry for the selected date
    const existingEntry = entries.find((entry) => entry.date === formattedDate);
    if (existingEntry) {
      setJournalEntry(existingEntry.journalEntry || "");
      setTags(existingEntry.flareFlag ? ["Flare Started"] : []);
      setMood(existingEntry.mood || 3);
      setAppointments(existingEntry.appointments || []);
    } else {
      // Reset form for a new entry
      setJournalEntry("");
      setTags([]);
      setMood(3);
      setAppointments([]);
    }
  };

  // Save or update an entry
  const handleSave = async () => {
    const entry = {
      date: selectedDate,
      journalEntry,
      flareFlag: tags.includes("Flare Started"),
      mood,
      appointments,
    };

    const existingEntry = entries.find((entry) => entry.date === selectedDate);

    try {
      if (existingEntry) {
        // Update existing entry
        const response = await fetch(`${API_URL}/${existingEntry._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        const updatedEntry = await response.json();
        setEntries((prevEntries) =>
          prevEntries.map((e) => (e._id === updatedEntry._id ? updatedEntry : e))
        );
      } else {
        // Create a new entry
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        const newEntry = await response.json();
        setEntries((prevEntries) => [...prevEntries, newEntry]);
      }
      alert("Entry saved successfully!");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Add a new appointment
  const addAppointment = () => {
    if (newAppointmentDate.trim() === "" || newAppointmentDescription.trim() === "") {
      alert("Please fill out both fields to add an appointment.");
      return;
    }

    const appointment = { description: newAppointmentDescription, date: newAppointmentDate };
    setAppointments([...appointments, appointment]);
    setNewAppointmentDate("");
    setNewAppointmentDescription("");
  };

  // Highlight dates with saved entries
  const tileClassName = ({ date }) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    if (entries.some((entry) => entry.date === formattedDate)) {
      return "highlight";
    }
    return null;
  };

  // Mood faces for the tracker
  const moodFaces = ["😢", "🙁", "😐", "🙂", "😄"];

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
              className="input-date"
            />
            <input
              type="text"
              value={newAppointmentDescription}
              onChange={(e) => setNewAppointmentDescription(e.target.value)}
              className="input-text"
            />
            <button onClick={addAppointment} className="add-appointment-button">
              Add Appointment
            </button>
          </div>

          <div className="card calendar">
            <h2>Calendar</h2>
            <Calendar onChange={handleDateChange} value={new Date()} tileClassName={tileClassName} />
          </div>
        </div>
      ) : (
        <div className="tracker-details">
          <div className="card calendar-small">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={new Date(selectedDate)}
              tileClassName={tileClassName}
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
                    className={`mood-face ${mood === index + 1 ? "selected-mood" : ""}`}
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
                  checked={tags.includes("Flare Started")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTags(["Flare Started"]);
                    } else {
                      setTags([]);
                    }
                  }}
                />
                <span className="checkmark"></span>
                Flare Started
              </label>
            </div>

            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;
