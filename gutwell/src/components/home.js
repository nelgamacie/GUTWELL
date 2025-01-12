import React from 'react';
import '../App.css'; // Assuming you want to use styles defined in App.css

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Making health accessible<br/> and affordable</h1>
        <p>The most trusted name in health supplements</p>
        <button onClick={() => window.location.href = '#/tracker'}>GO TO TRACKER</button>
      </header>
    </div>
  );
}

export default Home;
