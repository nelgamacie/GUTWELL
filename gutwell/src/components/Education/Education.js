import React from 'react';
import './Education.css'; // Import styles

export default function EducationalPage() {
  return (
    <div className="education-container">
      <h1 className="education-title">Learn About IBD</h1>
      <p className="education-intro">
        Discover trustworthy resources, expert advice, and tools to better understand and manage IBD.
      </p>

      {/* Section: Articles and Videos */}
      <div className="education-section">
        <h2>Articles and Videos</h2>
        <div className="resource-list">
          <div className="resource-item">
            <h3>Understanding IBD</h3>
            <p>A comprehensive guide to IBD symptoms and treatments.</p>
            <a href="https://example.com/article" target="_blank" rel="noopener noreferrer">
              Read Article
            </a>
          </div>
          <div className="resource-item">
            <h3>Living with IBD</h3>
            <p>Watch this video by leading healthcare professionals.</p>
            <a href="https://example.com/video" target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </div>
        </div>
      </div>

      {/* Section: Interactive Quizzes */}
      <div className="education-section">
        <h2>Interactive Quizzes</h2>
        <p>Test your understanding of IBD symptoms, treatments, and management strategies.</p>
        <button className="quiz-button">Start Quiz</button>
      </div>

      {/* Section: Personalized Tips */}
      <div className="education-section">
        <h2>Personalized Tips</h2>
        <p>Get recommendations based on your specific symptoms and severity:</p>
        <ul>
          <li>Dietary tips for reducing inflammation.</li>
          <li>Exercise routines for IBD management.</li>
          <li>Stress management techniques.</li>
        </ul>
      </div>

      {/* Section: Mental Health Support */}
      <div className="education-section">
        <h2>Mental Health Support</h2>
        <p>Resources to help you manage the mental health impact of living with IBD:</p>
        <ul>
          <li>
            <a href="https://example.com/meditation" target="_blank" rel="noopener noreferrer">
              Guided Meditation Exercises
            </a>
          </li>
          <li>
            <a href="https://example.com/therapy" target="_blank" rel="noopener noreferrer">
              Virtual Therapy for Chronic Illness
            </a>
          </li>
        </ul>
      </div>

      {/* Section: Support Groups */}
      <div className="education-section">
        <h2>Support Groups</h2>
        <p>Connect with others living with IBD for advice and encouragement:</p>
        <ul>
          <li>
            <a href="https://example.com/group1" target="_blank" rel="noopener noreferrer">
              IBD Peer Support Forum
            </a>
          </li>
          <li>
            <a href="https://example.com/group2" target="_blank" rel="noopener noreferrer">
              Virtual Support Groups
            </a>
          </li>
        </ul>
      </div>

      {/* Section: Kids & Teachers Resources */}
      <div className="education-section">
        <h2>Resources for Kids and Teachers</h2>
        <p>Help children understand and manage IBD with tailored resources:</p>
        <ul>
          <li>Simple symptom trackers for kids.</li>
          <li>Educational guides for teachers and peers.</li>
          <li>
            <a href="https://example.com/stress-games" target="_blank" rel="noopener noreferrer">
              Games for Stress Management
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
