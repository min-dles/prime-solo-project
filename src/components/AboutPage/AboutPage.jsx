import React from 'react';
import '../Styling/LoggedOut.css';
import Nav from '../Nav/Nav';

function AboutPage() {
  return (
    <div className="page-container">
      <div className="content-background"></div>
      <div className="content-a">
        <p>Use Chore Cycle to sync your recurring tasks with the phases of the moon! Get more in tune with your monthly rituals and the rhythms of nature.</p>
      </div>
      <div className="content-b">
        <Nav />
      </div>
      <div className="blank-space"></div>
    </div>
  );
}

export default AboutPage;
