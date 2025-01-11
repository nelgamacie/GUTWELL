'use client';

import React, { useState, useEffect } from 'react';
import './page.css';

export default function Home() {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', withFood: '', timeOfDay: '' });

  const [refills, setRefills] = useState([]);
  const [sideEffects, setSideEffects] = useState(() => {
    const saved = localStorage.getItem('sideEffects');
    return saved ? JSON.parse(saved) : [];
  });
  const [newSideEffect, setNewSideEffect] = useState({ date: '', description: '', severity: '' });

  const [treatments, setTreatments] = useState(() => {
    const saved = localStorage.getItem('treatments');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTreatment, setNewTreatment] = useState({ name: '', date: '', time: '' });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('sideEffects', JSON.stringify(sideEffects));
  }, [sideEffects]);

  useEffect(() => {
    localStorage.setItem('treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    const fetchRefills = async () => {
      const mockRefills = [
        { id: 1, medicationName: 'Medication A', refillDate: '2023-06-15', pharmacy: 'Local Pharmacy' },
        { id: 2, medicationName: 'Medication B', refillDate: '2023-06-20', pharmacy: 'City Drugstore' },
      ];
      setRefills(mockRefills);
    };
    fetchRefills();
  }, []);

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency && newMedication.withFood && newMedication.timeOfDay) {
      setMedications([...medications, { ...newMedication, id: Date.now() }]);
      setNewMedication({ name: '', dosage: '', frequency: '', withFood: '', timeOfDay: '' });
    }
  };

  const addSideEffect = () => {
    if (newSideEffect.date && newSideEffect.description && newSideEffect.severity) {
      setSideEffects([...sideEffects, { ...newSideEffect, id: Date.now() }]);
      setNewSideEffect({ date: '', description: '', severity: '' });
    }
  };

  const addTreatment = () => {
    if (newTreatment.name && newTreatment.date && newTreatment.time) {
      setTreatments([...treatments, { ...newTreatment, id: Date.now() }]);
      setNewTreatment({ name: '', date: '', time: '' });
    }
  };

  const handleRefill = (id) => {
    alert(`Refill requested for medication with ID ${id}`);
    setRefills(refills.filter((refill) => refill.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">IBD Medication and Treatment Manager</h1>
      <div className="grid">

        {/* Medication List */}
        <div>
          <h2>Medication List</h2>
          <div className="medication-list">
            {medications.map((med) => (
              <div key={med.id} className="medication-item">
                <p>
                  <strong>{med.name}</strong> - {med.dosage}, {med.frequency}
                </p>
                <p>Take {med.withFood}, {med.timeOfDay}</p>
              </div>
            ))}
          </div>
          <input placeholder="Name" value={newMedication.name} onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })} />
          <button onClick={addMedication}>Add</button>
        </div>

        {/* Refill Alerts */}
        <div>
          <h2>Refill Alerts</h2>
          <div className="refill-list">
            {refills.map((refill) => (
              <div key={refill.id} className="refill-item">
                <div>
                  <p>
                    <strong>{refill.medicationName}</strong>
                  </p>
                  <p>Refill by: {refill.refillDate}</p>
                  <p>Pharmacy: {refill.pharmacy}</p>
                </div>
                <button onClick={() => handleRefill(refill.id)}>Request Refill</button>
              </div>
            ))}
          </div>
        </div>

        {/* Side Effect Logger */}
        <div>
          <h2>Side Effect Logger</h2>
          <div className="side-effect-list">
            {sideEffects.map((effect) => (
              <div key={effect.id} className="side-effect-item">
                <p>
                  <strong>{effect.date}</strong> - Severity: {effect.severity}
                </p>
                <p>{effect.description}</p>
              </div>
            ))}
          </div>
          <input
            type="date"
            value={newSideEffect.date}
            onChange={(e) => setNewSideEffect({ ...newSideEffect, date: e.target.value })}
          />
          <input
            placeholder="Describe the side effect"
            value={newSideEffect.description}
            onChange={(e) => setNewSideEffect({ ...newSideEffect, description: e.target.value })}
          />
          <input
            placeholder="Severity (1-10)"
            value={newSideEffect.severity}
            onChange={(e) => setNewSideEffect({ ...newSideEffect, severity: e.target.value })}
          />
          <button onClick={addSideEffect}>Log Side Effect</button>
        </div>

        {/* Treatment Schedule */}
        <div>
          <h2>Treatment Schedule</h2>
          <div className="treatment-list">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="treatment-item">
                <p>
                  <strong>{treatment.name}</strong> - {treatment.date}, {treatment.time}
                </p>
              </div>
            ))}
          </div>
          <input
            placeholder="Treatment name"
            value={newTreatment.name}
            onChange={(e) => setNewTreatment({ ...newTreatment, name: e.target.value })}
          />
          <input
            type="date"
            value={newTreatment.date}
            onChange={(e) => setNewTreatment({ ...newTreatment, date: e.target.value })}
          />
          <input
            type="time"
            value={newTreatment.time}
            onChange={(e) => setNewTreatment({ ...newTreatment, time: e.target.value })}
          />
          <button onClick={addTreatment}>Add Treatment</button>
        </div>

      </div>
    </div>
  );
}
