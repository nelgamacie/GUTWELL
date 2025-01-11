import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./page.css";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    journalEntry: "",
    foods: "",
    flareFlag: false,
    mood: 3,
  });
  const [entries, setEntries] = useState([]);

  // Fetch all entries when the component loads
  useEffect(() => {
    fetchEntries();
  }, []);

  // Fetch entries from the backend
  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/calendar-entries");
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = {
      ...formData,
      date: selectedDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      foods: formData.foods.split(",").map((food) => ({
        name: food.trim(),
        isTrigger: false,
      })),
    };

    try {
      const response = await fetch("http://localhost:4000/api/calendar-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (response.ok) {
        const newEntry = await response.json();
        setEntries([...entries, newEntry]); // Update the list with the new entry
        alert("Entry saved successfully!");
        setFormData({ journalEntry: "", foods: "", flareFlag: false, mood: 3 }); // Reset the form
      } else {
        alert("Failed to save entry!");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <div className="calendar-page">
      <h1>IBD Calendar</h1>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h2>Selected Date: {selectedDate.toDateString()}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Journal Entry:</label>
          <textarea
            name="journalEntry"
            value={formData.journalEntry}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Foods (comma-separated):</label>
          <input
            type="text"
            name="foods"
            value={formData.foods}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Flare Day:</label>
          <input
            type="checkbox"
            name="flareFlag"
            checked={formData.flareFlag}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mood (1-Happy to 5-Upset):</label>
          <input
            type="number"
            name="mood"
            min="1"
            max="5"
            value={formData.mood}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Entry</button>
      </form>

      <h2>Entries:</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            {entry.date}: Mood {entry.mood}, Flare {entry.flareFlag ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPage;
